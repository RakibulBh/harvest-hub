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
                promotion_id AS id,
                product_id,  
                discounted_percentage AS discount,
                
            FROM Products
        `);

    client.release(); // Release connection back to pool

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return NextResponse.json(
      { error: "Failed to fetch promotions" },
      { status: 500 }
    );
  }
}
