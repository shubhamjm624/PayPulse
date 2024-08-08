import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // List all email logs
      const emailLogs = await prisma.emailLog.findMany()
      res.status(200).json(emailLogs)
      break
    case 'POST':
      // Create a new email log
      const { userId, emailType, sentAt, status, message } = req.body
      const newEmailLog = await prisma.emailLog.create({
        data: { userId, emailType, sentAt, status, message }
      })
      res.status(201).json(newEmailLog)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
