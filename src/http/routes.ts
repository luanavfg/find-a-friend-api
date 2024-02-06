import { FastifyInstance } from 'fastify'
import { register } from './controllers/organizations/register'
import { authenticate } from './controllers/organizations/authenticate'
import { createPet } from './controllers/pets/create-pet'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/organizations', register)
  app.post('/sessions', authenticate)

  app.post('/pets', { onRequest: [verifyJWT] }, createPet)
}
