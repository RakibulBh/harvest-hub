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
}
