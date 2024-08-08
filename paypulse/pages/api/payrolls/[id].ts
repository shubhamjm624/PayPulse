import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  switch (req.method) {
    case 'GET':
      // Retrieve a specific payroll
      const payroll = await prisma.payroll.findUnique({
        where: { id: String(id) }
      })
      if (!payroll) {
        res.status(404).json({ message: 'Payroll not found' })
      } else {
        res.status(200).json(payroll)
      }
      break
    case 'PUT':
      // Update a specific payroll
      const updatedPayroll = await prisma.payroll.update({
        where: { id: String(id) },
        data: req.body
      })
      res.status(200).json(updatedPayroll)
      break
    case 'DELETE':
      // Delete a specific payroll
      await prisma.payroll.delete({
        where: { id: String(id) }
      })
      res.status(204).end()
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
