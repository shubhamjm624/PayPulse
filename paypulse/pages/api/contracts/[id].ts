import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  switch (req.method) {
    case 'GET':
      // Retrieve a specific contract
      const contract = await prisma.contract.findUnique({
        where: { id: String(id) }
      })
      if (!contract) {
        res.status(404).json({ message: 'Contract not found' })
      } else {
        res.status(200).json(contract)
      }
      break
    case 'PUT':
      // Update a specific contract
      const updatedContract = await prisma.contract.update({
        where: { id: String(id) },
        data: req.body
      })
      res.status(200).json(updatedContract)
      break
    case 'DELETE':
      // Delete a specific contract
      await prisma.contract.delete({
        where: { id: String(id) }
      })
      res.status(204).end()
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
