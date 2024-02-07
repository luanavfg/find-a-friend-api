import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsBodySchema = z.object({
    city: z.string(),
    age: z.enum(['adult', 'elderly', 'cub']),
    size: z.enum(['big', 'medium', 'small']),
  })

  const { city, age, size } = searchPetsBodySchema.parse(request.body)

  try {
    const searchPetsUseCase = makeSearchPetsUseCase()

    const { pets } = await searchPetsUseCase.execute({
      city,
      query: {
        age,
        size,
      },
    })

    return reply.status(200).send({ pets })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
