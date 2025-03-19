import { NextResponse } from "next/server";
import { Client } from "pg";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    try {
        await client.connect();

        // Fetch farmer details
        const farmerResult = await client.query(
            `
            SELECT 
                farm_id AS id, 
                farm_name AS name, 
                contact_name AS contact, 
                address, 
                postcode, 
                contact_email AS email, 
                contact_phone AS phone, 
                description 
            FROM Farms
            WHERE farm_id = $1
            `,
            [params.id]
        );

        if (farmerResult.rows.length === 0) {
            await client.end();
            return NextResponse.json({ error: "Farm not found" }, { status: 404 });
        }

        // Fetch products for the farmer
        const productsResult = await client.query(
            `
            SELECT 
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
            WHERE farm_id = $1
            `,
            [params.id]
        );

        await client.end();

        return NextResponse.json({
            farmer: farmerResult.rows[0],
            products: productsResult.rows,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching farm details:", error.message);
            return NextResponse.json(
                { error: "Failed to fetch farm details", details: error.message },
                { status: 500 }
            );
        } else {
            console.error("Unexpected error:", error);
            return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
        }
    }
}
