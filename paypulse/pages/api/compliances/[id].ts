import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  switch (req.method) {
    case 'GET':
      // Retrieve a specific compliance
      const compliance = await prisma.compliance.findUnique({
        where: { id: String(id) }
      })
      if (!compliance) {
        res.status(404).json({ message: 'Compliance not found' })
      } else {
        res.status(200).json(compliance)
      }
      break
    case 'PUT':
      // Update a specific compliance
      const updatedCompliance = await prisma.compliance.update({
        where: { id: String(id) },
        data: req.body
      })
      res.status(200).json(updatedCompliance)
      break
    case 'DELETE':
      // Delete a specific compliance
      await prisma.compliance.delete({
        where: { id: String(id) }
      })
      res.status(204).end()
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
