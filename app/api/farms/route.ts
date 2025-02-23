import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// Handle GET (all farms or single farm via query parameter)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const farm = await sql`SELECT * FROM Farms WHERE farm_id = ${id}`;
      if (farm.length === 0) {
        return NextResponse.json({ error: "Farm not found" }, { status: 404 });
      }
      return NextResponse.json(farm[0]);
    } else {
      const farms = await sql`SELECT * FROM Farms`;
      return NextResponse.json(farms);
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch farm(s)" }, { status: 500 });
  }
}

// Handle POST (create a new farm)
export async function POST(req: NextRequest) {
  try {
    const { farm_name, contact_name, address, postcode, contact_email, contact_phone, description } = await req.json();
    const newFarm = await sql`
      INSERT INTO Farms (farm_name, contact_name, address, postcode, contact_email, contact_phone, description)
      VALUES (${farm_name}, ${contact_name}, ${address}, ${postcode}, ${contact_email}, ${contact_phone}, ${description})
      RETURNING *`;
    return NextResponse.json(newFarm[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create farm" }, { status: 500 });
  }
}

// Handle PUT (update a farm by ID via query parameter)
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Farm ID is required" }, { status: 400 });
  }

  try {
    const { farm_name, contact_name, address, postcode, contact_email, contact_phone, description } = await req.json();
    const updatedFarm = await sql`
      UPDATE Farms 
      SET farm_name=${farm_name}, contact_name=${contact_name}, address=${address}, postcode=${postcode}, 
          contact_email=${contact_email}, contact_phone=${contact_phone}, description=${description}
      WHERE farm_id = ${id} RETURNING *`;

    if (updatedFarm.length === 0) {
      return NextResponse.json({ error: "Farm not found" }, { status: 404 });
    }
    return NextResponse.json(updatedFarm[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update farm" }, { status: 500 });
  }
}

// Handle DELETE (delete a farm by ID via query parameter)
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Farm ID is required" }, { status: 400 });
  }

  try {
    await sql`DELETE FROM Farms WHERE farm_id = ${id}`;
    return NextResponse.json({ message: "Farm deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete farm" }, { status: 500 });
  }
}
