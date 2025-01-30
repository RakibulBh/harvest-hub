import { NextResponse } from "next/server";
import { Client } from "pg";

export async function GET(
  request: Request, 
  { params }: { params: { id: string } }
) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    const result = await client.query(
      `
      SELECT 
        promotion_id AS id,
        product_name AS title, 
        discount_percentage AS discount,
        description 
      FROM Promotions
      JOIN Products ON Promotions.product_id = Products.product_id
      WHERE promotion_id = $1
      `,
      [params.id]
    );

    await client.end();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Promotion not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    console.error("Error fetching promotion:", error);
    return NextResponse.json({ error: "Failed to fetch promotion" }, { status: 500 });
  }
}
