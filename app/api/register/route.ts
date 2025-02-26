import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import validator from "validator";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env.local");
}

const sql = neon(process.env.DATABASE_URL); 

export async function POST(req: NextRequest) {
  try {
    const { farmName, phone, email, password, confirmPassword, location } = await req.json();

    
    if (![farmName, phone, email, password, confirmPassword, location].every(Boolean)) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    
    if (!validator.isEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    
    if (!validator.isMobilePhone(phone, "any")) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    
    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    
    if (!validator.isStrongPassword(password, { minLength: 8, minNumbers: 1, minUppercase: 1, minSymbols: 1 })) {
      return NextResponse.json({ error: "Weak password. Use at least 8 characters, 1 number, 1 uppercase, and 1 symbol." }, { status: 400 });
    }

    
    const existingUser = await sql`SELECT * FROM farmers WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await sql`
      INSERT INTO farmers (farm_name, phone, email, password, location) 
      VALUES (${farmName}, ${phone}, ${email}, ${hashedPassword}, ${location})
      RETURNING id, farm_name, email, location;
    `;

    return NextResponse.json(
      { message: "Account created successfully!", user: newUser[0] },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error in registration:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
