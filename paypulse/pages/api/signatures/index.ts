import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // List all signatures
      const signatures = await prisma.signature.findMany()
      res.status(200).json(signatures)
      break
    case 'POST':
      // Create a new signature
      const { contractId, userId, signature, signedAt } = req.body
      const newSignature = await prisma.signature.create({
        data: { contractId, userId, signature, signedAt }
      })
      res.status(201).json(newSignature)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
