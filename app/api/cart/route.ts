import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// Handle get requests 
export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.URL);
    const id = searchParams.get("id");

    if(!userid) {
        return NextResponse.json({ message: 'Login to View your Cart' }, { status : 401} );
    }

    try {
        const cartItems = await sql( ' SELECT * From Cart WHERE user_id = $1', [userid]);
        return NextResponse.json(cartItems, { status: 200})
    } catch (error){

        console.error("Error fetching cart details", error);
        return NextResponse.json({ error : "Server error"}, { status: 500})
    } 
}