import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`Incoming ${req.method} request at ${new Date().toISOString()}`); // Log request method and timestamp

  try {
    switch (req.method) {
      case 'GET':
        // List all users
        console.log('Fetching all users from the database.');
        const users = await prisma.user.findMany()
        console.log(`Found ${users.length} users.`);
        res.status(200).json(users)
        break
      case 'POST':
        // Create a new user
        const { email, name, role, address, phone, position, company } = req.body    
        console.log('Received data to create a new user:', req.body);

        const newUser = await prisma.user.create({
          data: { email, name, role, address, phone, position, company }
        })
        console.log('New user created with ID:', newUser.id);
        res.status(201).json(newUser)
        break
      default:
        console.log(`Method ${req.method} Not Allowed.`);
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
