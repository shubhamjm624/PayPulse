import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  console.log(`Received request: ${req.method} /api/users/${id}`)

  switch (req.method) {
    case 'GET':
      console.log(`Fetching user with id: ${id}`)
      try {
        const user = await prisma.user.findUnique({
          where: { id: String(id) }
        })
        if (!user) {
          console.warn(`User not found: ${id}`)
          res.status(404).json({ message: 'User not found' })
        } else {
          console.log(`User found: ${JSON.stringify(user)}`)
          res.status(200).json(user)
        }
      } catch (error) {
        console.error(`Error fetching user: ${error}`)
        res.status(500).json({ message: 'Internal server error' })
      }
      break

    case 'PUT':
      console.log(`Updating user with id: ${id}, data: ${JSON.stringify(req.body)}`)
      try {
        const updatedUser = await prisma.user.update({
          where: { id: String(id) },
          data: req.body
        })
        console.log(`User updated: ${JSON.stringify(updatedUser)}`)
        res.status(200).json(updatedUser)
      } catch (error) {
        console.error(`Error updating user: ${error}`)
        res.status(500).json({ message: 'Internal server error' })
      }
      break

    case 'DELETE':
      console.log(`Deleting user with id: ${id}`)
      try {
        await prisma.user.delete({
          where: { id: String(id) }
        })
        console.log(`User deleted: ${id}`)
        res.status(204).end()
      } catch (error) {
        console.error(`Error deleting user: ${error}`)
        res.status(500).json({ message: 'Internal server error' })
      }
      break

    default:
      console.warn(`Method not allowed: ${req.method}`)
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
