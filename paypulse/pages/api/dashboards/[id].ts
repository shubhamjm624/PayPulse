import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  switch (req.method) {
    case 'GET':
      // Retrieve a specific dashboard
      const dashboard = await prisma.dashboard.findUnique({
        where: { id: String(id) }
      })
      if (!dashboard) {
        res.status(404).json({ message: 'Dashboard not found' })
      } else {
        res.status(200).json(dashboard)
      }
      break
    case 'PUT':
      // Update a specific dashboard
      const updatedDashboard = await prisma.dashboard.update({
        where: { id: String(id) },
        data: req.body
      })
      res.status(200).json(updatedDashboard)
      break
    case 'DELETE':
      // Delete a specific dashboard
      await prisma.dashboard.delete({
        where: { id: String(id) }
      })
      res.status(204).end()
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
