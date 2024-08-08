import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // List all notifications
      const notifications = await prisma.notification.findMany()
      res.status(200).json(notifications)
      break
    case 'POST':
      // Create a new notification
      const { userId, message, type, status } = req.body
      const newNotification = await prisma.notification.create({
        data: { userId, message, type, status }
      })
      res.status(201).json(newNotification)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
