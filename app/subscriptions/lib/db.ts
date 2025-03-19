import { Pool } from "pg";


const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}


export const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }, 
});


export const query = async (text: string, params?: unknown[]) => {
    try {
        return await pool.query(text, params);
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};


export const getClient = async () => {
    const client = await pool.connect();
    return client;
};


process.on('SIGTERM', () => {
    pool.end().then(() => {
        console.log('Subscription database pool has ended');
    });
}); 