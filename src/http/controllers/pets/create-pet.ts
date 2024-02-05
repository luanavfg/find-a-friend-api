import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.string(),
    size: z.enum(['big', 'medium', 'small']).default('medium'),
    pictures: z.array(z.string()),
  })

  await request.jwtVerify()
  const organizationId = request.user.sub

  const { name, age, description, pictures, size } = createPetBodySchema.parse(
    request.body,
  )

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      name,
      age,
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
