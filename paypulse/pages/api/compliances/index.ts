import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // List all compliances
      const compliances = await prisma.compliance.findMany()
      res.status(200).json(compliances)
      break
    case 'POST':
      // Create a new compliance
      const { userId, contractId, country, complianceIssues, documents } = req.body
      const newCompliance = await prisma.compliance.create({
        data: { userId, contractId, country, complianceIssues, documents }
      })
      res.status(201).json(newCompliance)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
