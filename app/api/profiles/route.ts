import { NextResponse } from "next/server";
import { Client } from "pg";

export async function GET() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    try {
        await client.connect();

        const result = await client.query(`
            SELECT 
                f.farm_id AS id, 
                f.farm_name AS name, 
                f.contact_name AS contact, 
                f.address, 
                f.postcode, 
                f.contact_email AS email, 
                f.contact_phone AS phone, 
                f.description,
                COALESCE(json_agg(
                    json_build_object(
                        'product_id', p.product_id,
                        'product_name', p.product_name
                    )
                ) FILTER (WHERE p.product_id IS NOT NULL), '[]') AS products
            FROM Farms f
            LEFT JOIN Products p ON f.farm_id = p.farm_id
            GROUP BY f.farm_id;
        `);

        await client.end();

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Error fetching profiles:", error);
        return NextResponse.json({ error: "Failed to fetch profiles" }, { status: 500 });
    }
}
