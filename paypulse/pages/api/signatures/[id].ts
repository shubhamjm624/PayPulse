import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  switch (req.method) {
    case 'GET':
      // Retrieve a specific signature
      const signature = await prisma.signature.findUnique({
        where: { id: String(id) }
      })
      if (!signature) {
        res.status(404).json({ message: 'Signature not found' })
      } else {
        res.status(200).json(signature)
      }
      break
    case 'PUT':
      // Update a specific signature
      const updatedSignature = await prisma.signature.update({
        where: { id: String(id) },
        data: req.body
      })
      res.status(200).json(updatedSignature)
      break
    case 'DELETE':
      // Delete a specific signature
      await prisma.signature.delete({
        where: { id: String(id) }
      })
      res.status(204).end()
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
