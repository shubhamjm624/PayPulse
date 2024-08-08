import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  switch (req.method) {
    case 'GET':
      // Retrieve a specific tax
      const tax = await prisma.tax.findUnique({
        where: { id: String(id) }
      })
      if (!tax) {
        res.status(404).json({ message: 'Tax not found' })
      } else {
        res.status(200).json(tax)
      }
      break
    case 'PUT':
      // Update a specific tax
      const updatedTax = await prisma.tax.update({
        where: { id: String(id) },
        data: req.body
      })
      res.status(200).json(updatedTax)
      break
    case 'DELETE':
      // Delete a specific tax
      await prisma.tax.delete({
        where: { id: String(id) }
      })
      res.status(204).end()
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
