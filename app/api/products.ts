import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { rows } = await pool.query('SELECT * FROM Products');
        res.status(200).json(rows);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: (error as Error).message });
      }
      break;

    case 'POST':
      try {
        const { farm_id, product_name, category, unit_price, unit, description, available_stock, image_url, harvest_date, best_before_date } = req.body;
        const { rows } = await pool.query(
          'INSERT INTO Products (farm_id, product_name, category, unit_price, unit, description, available_stock, image_url, harvest_date, best_before_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
          [farm_id, product_name, category, unit_price, unit, description, available_stock, image_url, harvest_date, best_before_date]
        );
        res.status(201).json(rows[0]);
      } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: (error as Error).message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}