import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL!);
  const userViews = await sql`
    SELECT * FROM user_product_views 
    WHERE user_id = ${userId}
  `;

  return NextResponse.json({ userViews, length: userViews.length });
}

export async function POST(req: Request) {
  const { userId, productId } = await req.json();

  console.log({ userId, productId });

  const sql = neon(process.env.DATABASE_URL!);
  await sql`
  INSERT INTO user_product_views (user_id, product_id)
  VALUES (${userId}, ${productId})
  `;

  return NextResponse.json({ hello: "hi" });
}
