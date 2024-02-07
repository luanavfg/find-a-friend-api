import { makeGetSpecificPetUseCase } from '@/use-cases/factories/make-get-specific-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const getSpecificPetParamsSchema = z.object({
  id: z.string(),
})

export async function getSpecificPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = getSpecificPetParamsSchema.parse(request.params)

  try {
    const getSpecificPetUseCase = makeGetSpecificPetUseCase()

    const { organizationInfo, pet } = await getSpecificPetUseCase.execute({
      id,
    })

    return reply.status(200).send({ pet, organizationInfo })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
