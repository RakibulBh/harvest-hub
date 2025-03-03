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
    console.log("Connected to database successfully");

    const result = await client.query(
      `
      SELECT 
                product_id AS id, 
                product_name AS name, 
                image_url AS image, 
                unit_price AS price, 
                description,
                category 
            FROM Products
      WHERE product_id = $1
    `,
      [params.id]
    );

    await client.end();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "product not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching product details:", error.message);
      return NextResponse.json(
        { error: "Failed to fetch product details", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unexpected error:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
