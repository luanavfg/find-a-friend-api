import { FastifyInstance } from 'fastify'
import { register } from './controllers/organizations/register'
import { createPet } from './controllers/pets/create-pet'

export async function appRoutes(app: FastifyInstance) {
  app.post('/organizations', register)
  app.post('/pets', createPet)
}
