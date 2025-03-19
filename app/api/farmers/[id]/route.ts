import { NextResponse } from "next/server";
import { pool } from "@/app/FarmAccount/lib/db"; 

// ✅ GET: Fetch a single farmer by ID
export async function GET(
    request: Request, 
    { params }: { params: { id: string } }
) {
    try {
        const farmerId = params.id;

        const result = await pool.query(
            `SELECT 
                farm_id AS id, 
                farm_name AS name, 
                contact_name AS contact, 
                address, 
                postcode, 
                contact_email AS email, 
                contact_phone AS phone, 
                description 
             FROM Farms 
             WHERE farm_id = $1`,
            [farmerId]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ error: "Farmer not found" }, { status: 404 });
        }

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching farmer details:", error);
        return NextResponse.json({ error: "Failed to fetch farmer details" }, { status: 500 });
    }
}

