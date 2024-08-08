import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // List all users
      const users = await prisma.user.findMany()
      res.status(200).json(users)
      break
    case 'POST':
      // Create a new user
      const { email, name, role, address, phone, position, company } = req.body
      const newUser = await prisma.user.create({
        data: { email, name, role, address, phone, position, company }
      })
      res.status(201).json(newUser)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
