import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // List all taxes
      const taxes = await prisma.tax.findMany()
      res.status(200).json(taxes)
      break
    case 'POST':
      // Create a new tax
      const { userId, contractId, taxForm, taxAmount, currency, filedDate, documents } = req.body
      const newTax = await prisma.tax.create({
        data: { userId, contractId, taxForm, taxAmount, currency, filedDate, documents }
      })
      res.status(201).json(newTax)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
