import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { createPet } from './controllers/create-pet'

export async function appRoutes(app: FastifyInstance) {
  app.post('/organizations', register)
  app.post('/pets', createPet)
}
