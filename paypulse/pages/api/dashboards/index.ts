import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // List all dashboards
      const dashboards = await prisma.dashboard.findMany()
      res.status(200).json(dashboards)
      break
    case 'POST':
      // Create a new dashboard
      const { userId, widgets } = req.body
      const newDashboard = await prisma.dashboard.create({
        data: { userId, widgets }
      })
      res.status(201).json(newDashboard)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
