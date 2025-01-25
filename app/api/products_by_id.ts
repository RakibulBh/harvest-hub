import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query: { id } } = req;

  switch (method) {
    case 'GET':
      try {
        const { rows } = await pool.query('SELECT * FROM Products WHERE product_id = $1', [id]);
        if (rows.length === 0) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: (error as Error).message });
      }
      break;

    case 'PUT':
      try {
        const { farm_id, product_name, category, unit_price, unit, description, available_stock, image_url, harvest_date, best_before_date } = req.body;
        const { rows } = await pool.query(
          'UPDATE Products SET farm_id = $1, product_name = $2, category = $3, unit_price = $4, unit = $5, description = $6, available_stock = $7, image_url = $8, harvest_date = $9, best_before_date = $10 WHERE product_id = $11 RETURNING *',
          [farm_id, product_name, category, unit_price, unit, description, available_stock, image_url, harvest_date, best_before_date, id]
        );
        if (rows.length === 0) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: (error as Error).message });
      }
      break;

    case 'DELETE':
      try {
        const { rowCount } = await pool.query('DELETE FROM Products WHERE product_id = $1', [id]);
        if (rowCount === 0) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: (error as Error).message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}