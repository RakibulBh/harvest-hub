import { Pool } from "pg";

// Ensure DATABASE_URL is available
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}

// Create a single database pool instance
export const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }, // Required for NeonDB
});

// Function to execute queries
export const query = (text: string, params?: unknown[]) => pool.query(text, params);
