import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  switch (req.method) {
    case 'GET':
      // Retrieve a specific payment
      const payment = await prisma.payment.findUnique({
        where: { id: String(id) }
      })
      if (!payment) {
        res.status(404).json({ message: 'Payment not found' })
      } else {
        res.status(200).json(payment)
      }
      break
    case 'PUT':
      // Update a specific payment
      const updatedPayment = await prisma.payment.update({
        where: { id: String(id) },
        data: req.body
      })
      res.status(200).json(updatedPayment)
      break
    case 'DELETE':
      // Delete a specific payment
      await prisma.payment.delete({
        where: { id: String(id) }
      })
      res.status(204).end()
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
