import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const searchPetsParamsSchema = z.object({
  city: z.string(),
})

const searchPetsQuerySchema = z.object({
  age: z.enum(['adult', 'elderly', 'cub']).optional(),
  size: z.enum(['big', 'medium', 'small']).optional(),
})
export type SearchQuery = z.infer<typeof searchPetsQuerySchema>

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const { city } = searchPetsParamsSchema.parse(request.params)
  const query = searchPetsQuerySchema.parse(request.query)

  try {
    const searchPetsUseCase = makeSearchPetsUseCase()

    const { pets } = await searchPetsUseCase.execute({
      city,
      query,
    })

    return reply.status(200).send({ pets })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
