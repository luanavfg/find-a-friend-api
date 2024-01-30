import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'

export const app = fastify()

const prisma = new PrismaClient()

prisma.organization.create({
  data: {
    name: 'Organization Test',
    email: 'organization@example.com',
    address: 'fake address',
    whatsApp_number: '123-456-789',
  },
})
