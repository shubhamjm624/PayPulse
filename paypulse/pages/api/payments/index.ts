import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // List all payments
      const payments = await prisma.payment.findMany()
      res.status(200).json(payments)
      break
    case 'POST':
      // Create a new payment
      const { payerId, payeeId, amount, currency, paymentMethod, status, transactionId, exchangeRate } = req.body
      const newPayment = await prisma.payment.create({
        data: { payerId, payeeId, amount, currency, paymentMethod, status, transactionId, exchangeRate }
      })
      res.status(201).json(newPayment)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
