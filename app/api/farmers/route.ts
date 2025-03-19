import { NextResponse } from "next/server";
import { pool } from "@/app/FarmAccount/lib/db";

// ✅ GET: Fetch all farmers
export async function GET() {
    try {
        const result = await pool.query(`
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
        `);
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Error fetching farmers:", error);
        return NextResponse.json({ error: "Failed to fetch farmers" }, { status: 500 });
    }
}
