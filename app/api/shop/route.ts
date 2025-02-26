import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ✅ Handles GET requests
export async function GET() {
  try {
    const client = await pool.connect();
    console.log("Connected to database successfully");

    const result = await client.query(`
            SELECT 
                product_id AS id, 
                product_name AS name, 
                image_url AS image, 
                unit_price AS price, 
                description,
                category 
            FROM Products
        `);

    client.release(); // Release connection back to pool

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
