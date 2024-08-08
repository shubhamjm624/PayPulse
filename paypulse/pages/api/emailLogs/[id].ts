import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  switch (req.method) {
    case 'GET':
      // Retrieve a specific email log
      const emailLog = await prisma.emailLog.findUnique({
        where: { id: String(id) }
      })
      if (!emailLog) {
        res.status(404).json({ message: 'Email log not found' })
      } else {
        res.status(200).json(emailLog)
      }
      break
    case 'PUT':
      // Update a specific email log
      const updatedEmailLog = await prisma.emailLog.update({
        where: { id: String(id) },
        data: req.body
      })
      res.status(200).json(updatedEmailLog)
      break
    case 'DELETE':
      // Delete a specific email log
      await prisma.emailLog.delete({
        where: { id: String(id) }
      })
      res.status(204).end()
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
