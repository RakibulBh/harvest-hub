import { NextRequest, NextResponse } from "next/server";
import { pool, query, getClient } from "@/app/subscriptions/lib/db";


const parseUnit = (unitStr: string) => {
  
  if (typeof unitStr === 'number') {
    return {
      value: unitStr,
      unit: 'units'
    };
  }

  const match = unitStr.match(/^(\d+)\s*(.+)$/);
  if (match) {
    return {
      value: parseInt(match[1]),
      unit: match[2],
    };
  }

  
  const numericValue = parseInt(unitStr);
  if (!isNaN(numericValue)) {
    return {
      value: numericValue,
      unit: 'units'
    };
  }

  return { value: 1, unit: unitStr || 'units' }; 
};


const createTables = async () => {
  try {
    
    await query(`
      CREATE TABLE IF NOT EXISTS premade_packages (
        package_id SERIAL PRIMARY KEY,
        package_name VARCHAR(255) NOT NULL,
        farm_id INTEGER NOT NULL REFERENCES farms(farm_id),
        description TEXT NOT NULL,
        retail_value DECIMAL(10,2) NOT NULL,
        plan_type VARCHAR(50) NOT NULL CHECK (plan_type IN ('weekly', 'biweekly', 'monthly')),
        items JSONB NOT NULL DEFAULT '[]',
        tags JSONB NOT NULL DEFAULT '[]',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
};

interface PackageItem {
  name: string;
  quantity: string;
}

export async function GET(req: NextRequest) {
  try {
    await createTables();

    const url = new URL(req.url);
    const farmId = url.searchParams.get('farmId');

    
    const baseQuery = `
      SELECT 
        p.package_id,
        p.package_name,
        p.description,
        p.retail_value,
        p.plan_type,
        p.created_at,
        p.farm_id,
        p.items,
        p.tags,
        f.farm_name,
        f.description as farm_description,
        f.address as farm_location
      FROM premade_packages p
      LEFT JOIN farms f ON p.farm_id = f.farm_id
      ${farmId ? 'WHERE p.farm_id = $1' : ''}
      ORDER BY p.created_at DESC
    `;

    const result = farmId
      ? await query(baseQuery, [farmId])
      : await query(baseQuery);

    return NextResponse.json(result.rows || []);
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch packages" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await createTables();

    const body = await req.json();
    console.log('Received request body:', body);
    const { name, farmer, farmId, description, retailValue, items, tags, planType } = body;

    
    const client = await getClient();
    try {
      await client.query('BEGIN');

      
      const processedItems = items.map((item: PackageItem) => {
        const { value: quantityValue, unit: quantityUnit } = parseUnit(item.quantity);
        return {
          name: item.name,
          quantity: `${quantityValue}${quantityUnit}`
        };
      });

      
      console.log('Creating package with data:', { name, farmId, description, retailValue, planType, items: processedItems, tags });
      const packageResult = await client.query(
        `INSERT INTO premade_packages (
          package_name,
          farm_id,
          description,
          retail_value,
          plan_type,
          items,
          tags,
          created_at,
          updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
        RETURNING package_id`,
        [name, farmId, description, retailValue, planType, JSON.stringify(processedItems), JSON.stringify(tags)]
      );

      const packageId = packageResult.rows[0].package_id;
      console.log('Created package with ID:', packageId);

      await client.query('COMMIT');
      console.log('Transaction committed successfully');
      return NextResponse.json({ 
        success: true, 
        message: "Package created successfully",
        packageId 
      });
    } catch (error) {
      console.error('Error in transaction:', error);
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error creating package:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create package" },
      { status: 500 }
    );
  }
} 