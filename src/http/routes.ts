import { FastifyInstance } from 'fastify'
import { register } from './controllers/organizations/register'
import { authenticate } from './controllers/organizations/authenticate'
import { createPet } from './controllers/pets/create-pet'
import { verifyJWT } from './middlewares/verify-jwt'
import { searchPets } from './controllers/pets/search-pets'
import { getSpecificPet } from './controllers/pets/get-specific-pet'

export async function appRoutes(app: FastifyInstance) {
  app.post('/organizations', register)
  app.post('/sessions', authenticate)

  app.get('/pets/:city', searchPets)
  app.get('/pets/:id', getSpecificPet)
  app.post('/pets', { onRequest: [verifyJWT] }, createPet)
}
