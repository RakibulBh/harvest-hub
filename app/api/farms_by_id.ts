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
        const { rows } = await pool.query('SELECT * FROM Farms WHERE farm_id = $1', [id]);
        if (rows.length === 0) {
          return res.status(404).json({ message: 'Farm not found' });
        }
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching farm', error: (error as Error).message });
      }
      break;

    case 'PUT':
      try {
        const { farm_name, contact_name, address, postcode, contact_email, contact_phone, description } = req.body;
        const { rows } = await pool.query(
          'UPDATE Farms SET farm_name = $1, contact_name = $2, address = $3, postcode = $4, contact_email = $5, contact_phone = $6, description = $7 WHERE farm_id = $8 RETURNING *',
          [farm_name, contact_name, address, postcode, contact_email, contact_phone, description, id]
        );
        if (rows.length === 0) {
          return res.status(404).json({ message: 'Farm not found' });
        }
        res.status(200).json(rows[0]);
      } catch (error) {
        res.status(500).json({ message: 'Error updating farm', error: (error as Error).message });
      }
      break;

    case 'DELETE':
      try {
        const { rowCount } = await pool.query('DELETE FROM Farms WHERE farm_id = $1', [id]);
        if (rowCount === 0) {
          return res.status(404).json({ message: 'Farm not found' });
        }
        res.status(200).json({ message: 'Farm deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting farm', error: (error as Error).message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}