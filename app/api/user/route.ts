import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";


if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(process.env.DATABASE_URL);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    
    const user = await sql`SELECT id, farm_name, email, location FROM farmers WHERE email = ${email}`;

    if (user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: user[0] });

  } catch (error: any) {
    console.error("Database query error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
