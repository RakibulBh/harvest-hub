import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  try {
    const client = await pool.connect();
    console.log("Connected to database successfully");

    const result = await client.query(`
        SELECT 
            p.product_id AS id, 
            p.farm_id AS farm_id,
            p.product_name AS name, 
            p.image_url AS image, 
            p.unit_price AS price, 
            p.description,
            p.category,
            p.unit,
            p.available_stock AS stock,
            p.harvest_date AS harvest_date,
            p.best_before_date AS best_before,
            p.liked AS liked,
            wp.promotion_id AS promotion_id,  
            wp.discount_percentage AS discount,
            wp.start_date AS discount_start,
            wp.end_date AS discount_end
        FROM Products p
        LEFT JOIN WeeklyPromotions wp ON p.product_id = wp.product_id
    `);

    client.release(); // Release connection back to pool

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching products with promotions:", error);
    return NextResponse.json(
      { error: "Failed to fetch products with promotions" },
      { status: 500 }
    );
  }
}
