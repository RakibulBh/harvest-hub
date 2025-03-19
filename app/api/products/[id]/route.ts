import { NextResponse } from "next/server";
import { pool } from "@/app/FarmAccount/lib/db"; // Ensure correct import path

// ✅ GET: Fetch all products for a given farmer ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const farmerId = params.id;

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
            [farmerId]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ message: "No products found for this farm" }, { status: 404 });
        }

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
