import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { method } = req;

  // switch (method) {
  //   case 'GET':
  //     try {
  //       const { rows } = await pool.query('SELECT * FROM Farms');
  //       res.status(200).json(rows);
  //     } catch (error) {
  //       res.status(500).json({ message: 'Error fetching farms', error: (error as Error).message });
  //     }
  //     break;

  //   case 'POST':
  //     try {
  //       const { farm_name, contact_name, address, postcode, contact_email, contact_phone, description } = req.body;
  //       const { rows } = await pool.query(
  //         'INSERT INTO Farms (farm_name, contact_name, address, postcode, contact_email, contact_phone, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
  //         [farm_name, contact_name, address, postcode, contact_email, contact_phone, description]
  //       );
  //       res.status(201).json(rows[0]);
  //     } catch (error) {
  //       res.status(500).json({ message: 'Error creating farm', error: (error as Error).message });
  //     }
  //     break;

  //   default:
  //     res.setHeader('Allow', ['GET', 'POST']);
  //     res.status(405).end(`Method ${method} Not Allowed`);
  // }

  console.log({message: "hello"});


}