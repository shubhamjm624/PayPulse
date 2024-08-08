import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  switch (req.method) {
    case 'GET':
      // Retrieve a specific user
      const user = await prisma.user.findUnique({
        where: { id: String(id) }
      })
      if (!user) {
        res.status(404).json({ message: 'User not found' })
      } else {
        res.status(200).json(user)
      }
      break
    case 'PUT':
      // Update a specific user
      const updatedUser = await prisma.user.update({
        where: { id: String(id) },
        data: req.body
      })
      res.status(200).json(updatedUser)
      break
    case 'DELETE':
      // Delete a specific user
      await prisma.user.delete({
        where: { id: String(id) }
      })
      res.status(204).end()
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
