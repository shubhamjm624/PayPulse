import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // List all payrolls
      const payrolls = await prisma.payroll.findMany()
      res.status(200).json(payrolls)
      break
    case 'POST':
      // Create a new payroll
      const { employerId, employeeId, contractId, salary, bonuses, deductions, netPay, currency, paymentDate, status, payslip } = req.body
      const newPayroll = await prisma.payroll.create({
        data: { employerId, employeeId, contractId, salary, bonuses, deductions, netPay, currency, paymentDate, status, payslip }
      })
      res.status(201).json(newPayroll)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
