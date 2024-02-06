import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsAppNumber: z.string(),
    address: z.string(),
    cep: z.string(),
  })

  const { name, email, password, address, whatsAppNumber, cep } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      address,
      whatsAppNumber,
      cep,
    })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
  return reply.status(201).send()
}
