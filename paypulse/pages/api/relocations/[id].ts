import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  switch (req.method) {
    case 'GET':
      // Retrieve a specific relocation
      const relocation = await prisma.relocation.findUnique({
        where: { id: String(id) }
      })
      if (!relocation) {
        res.status(404).json({ message: 'Relocation not found' })
      } else {
        res.status(200).json(relocation)
      }
      break
    case 'PUT':
      // Update a specific relocation
      const updatedRelocation = await prisma.relocation.update({
        where: { id: String(id) },
        data: req.body
      })
      res.status(200).json(updatedRelocation)
      break
    case 'DELETE':
      // Delete a specific relocation
      await prisma.relocation.delete({
        where: { id: String(id) }
      })
      res.status(204).end()
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
