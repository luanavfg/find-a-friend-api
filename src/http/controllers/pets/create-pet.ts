import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.enum(['adult', 'elderly', 'cub']),
    size: z.enum(['big', 'medium', 'small']),
    city: z.string(),
    pictures: z.array(z.string()),
  })

  const organizationId = request.user.sub

  const { name, age, description, pictures, size, city } =
    createPetBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      name,
      age,
      city,
      description,
      organizationId,
      pictures,
      size,
    })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
