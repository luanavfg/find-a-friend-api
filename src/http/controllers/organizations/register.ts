import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { RegisterUseCase } from '@/use-cases/organizations/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsAppNumber: z.string(),
    address: z.string(),
  })

  const { name, email, password, address, whatsAppNumber } =
    registerBodySchema.parse(request.body)

  try {
    const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
    const registerUseCase = new RegisterUseCase(prismaOrganizationsRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
      address,
      whatsAppNumber,
    })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
  return reply.status(201).send()
}
