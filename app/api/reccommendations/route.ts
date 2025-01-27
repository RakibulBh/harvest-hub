import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const sql = neon(process.env.DATABASE_URL!);

  return NextResponse.json({ hello: "hi" });
}
