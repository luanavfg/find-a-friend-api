import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/organizations', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsAppNumber: z.string(),
    address: z.string(),
  })

  const { name, email, password, address, whatsAppNumber } =
    registerBodySchema.parse(request.body)

  await prisma.organization.create({
    data: {
      name,
      email,
      password_hash: password,
      address,
      whatsApp_number: whatsAppNumber,
    },
  })

  return reply.status(201).send()
})
