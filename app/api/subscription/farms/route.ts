import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/subscriptions/lib/db";


const createTables = async () => {
  try {
    
    await query(`
      CREATE TABLE IF NOT EXISTS Farms (
        farm_id SERIAL PRIMARY KEY,
        farm_name VARCHAR(255) NOT NULL,
        description TEXT,
        address TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    
    await query(`
      CREATE TABLE IF NOT EXISTS Products (
        product_id SERIAL PRIMARY KEY,
        farm_id INTEGER NOT NULL REFERENCES Farms(farm_id),
        product_name VARCHAR(255) NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        unit VARCHAR(50) NOT NULL,
        category VARCHAR(100) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
};


export async function GET(req: NextRequest) {
  try {
    
    await createTables();

    const result = await query(`
      SELECT 
        f.farm_id,
        f.farm_name,
        f.description,
        f.address as location,
        ARRAY_AGG(DISTINCT p.category) as specialties,
        COALESCE(
          json_agg(
            json_build_object(
              'id', p.product_id,
              'name', p.product_name,
              'price', p.unit_price,
              'unit', p.unit,
              'category', p.category,
              'organic', true
            )
          ) FILTER (WHERE p.product_id IS NOT NULL),
          '[]'
        ) as products
      FROM Farms f
      LEFT JOIN Products p ON f.farm_id = p.farm_id
      GROUP BY f.farm_id, f.farm_name, f.description, f.address
    `);

    
    return NextResponse.json(result.rows || []);
  } catch (error) {
    console.error('Error fetching farms with products:', error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch farms with products";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 