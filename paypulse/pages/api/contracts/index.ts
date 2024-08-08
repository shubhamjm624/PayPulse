import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // List all contracts
      const contracts = await prisma.contract.findMany()
      res.status(200).json(contracts)
      break
    case 'POST':
      // Create a new contract
      const { employerId, employeeId, title, description, contractType, startDate, endDate, terms, status } = req.body
      const newContract = await prisma.contract.create({
        data: { employerId, employeeId, title, description, contractType, startDate, endDate, terms, status }
      })
      res.status(201).json(newContract)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
