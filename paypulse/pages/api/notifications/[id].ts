import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  switch (req.method) {
    case 'GET':
      // Retrieve a specific notification
      const notification = await prisma.notification.findUnique({
        where: { id: String(id) }
      })
      if (!notification) {
        res.status(404).json({ message: 'Notification not found' })
      } else {
        res.status(200).json(notification)
      }
      break
    case 'PUT':
      // Update a specific notification
      const updatedNotification = await prisma.notification.update({
        where: { id: String(id) },
        data: req.body
      })
      res.status(200).json(updatedNotification)
      break
    case 'DELETE':
      // Delete a specific notification
      await prisma.notification.delete({
        where: { id: String(id) }
      })
      res.status(204).end()
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
