import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // List all relocations
      const relocations = await prisma.relocation.findMany()
      res.status(200).json(relocations)
      break
    case 'POST':
      // Create a new relocation
      const { userId, currentLocation, newLocation, relocationDate, visaRequired, visaDetails, housing, status, notes } = req.body
      const newRelocation = await prisma.relocation.create({
        data: { userId, currentLocation, newLocation, relocationDate, visaRequired, visaDetails, housing, status, notes }
      })
      res.status(201).json(newRelocation)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
