<<<<<<< HEAD
import { NextResponse } from "next/server";
import { pool } from "@/app/FarmAccount/lib/db"; // ✅ Ensure this is the correct path

// ✅ GET: Fetch products for a specific farm
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const farmId = searchParams.get("farm_id");

        if (!farmId) {
            return NextResponse.json({ error: "Farm ID is required" }, { status: 400 });
        }

        const result = await pool.query(
            `SELECT 
                product_id, 
                product_name, 
                category, 
                unit_price, 
                unit, 
                description, 
                available_stock, 
                image_url, 
                harvest_date, 
                best_before_date
             FROM Products 
             WHERE farm_id = $1`, 
            [farmId]
        );

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
=======
import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// Handle GET (all products or single product via query parameter)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const product = await sql`SELECT * FROM Products WHERE product_id = ${id}`;
      if (product.length === 0) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json(product[0]);
    } else {
      const products = await sql`SELECT * FROM Products`;
      return NextResponse.json(products);
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product(s)" }, { status: 500 });
  }
}

// Handle POST (create a new product)
export async function POST(req: NextRequest) {
  try {
    const { farm_id, product_name, category, unit_price, unit, description, available_stock, image_url, harvest_date, best_before_date } = await req.json();

    const newProduct = await sql`
      INSERT INTO Products (farm_id, product_name, category, unit_price, unit, description, available_stock, image_url, harvest_date, best_before_date)
      VALUES (${farm_id}, ${product_name}, ${category}, ${unit_price}, ${unit}, ${description}, ${available_stock}, ${image_url}, ${harvest_date}, ${best_before_date})
      RETURNING *`;

    return NextResponse.json(newProduct[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

// Handle PUT (update a product by ID via query parameter)
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    const { product_name, unit_price, available_stock } = await req.json();

    const updatedProduct = await sql`
      UPDATE Products 
      SET product_name = ${product_name}, unit_price = ${unit_price}, available_stock = ${available_stock}
      WHERE product_id = ${id} RETURNING *`;

    if (updatedProduct.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// Handle DELETE (delete a product by ID via query parameter)
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    await sql`DELETE FROM Products WHERE product_id = ${id}`;
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
>>>>>>> 153612e0dae4449d7bb87ade3508a80349817360
}
