import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { hash } from 'bcryptjs'

describe('[E2E] Get Specific Pet', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a specific pet', async () => {
    const organizationsRepository = new PrismaOrganizationsRepository()
    const organization = await organizationsRepository.create({
      name: faker.company.name(),
      email: faker.internet.email(),
      password_hash: await hash('123456', 6),
      whatsApp_number: faker.phone.number(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
    })

    const petsRepository = new PrismaPetsRepository()
    const petCreated = await petsRepository.create({
      name: faker.person.firstName(),
      description: faker.lorem.paragraph(),
      age: 'adult',
      size: 'big',
      city: faker.location.city(),
      organization_id: organization.id,
      pictures: [],
    })

    const { body } = await request(app.server).get(`/pets/${petCreated.id}`)
    expect(body.pet).toBeDefined()
  })

  it('should not be able to get a pet that does not exist', async () => {
    const response = await request(app.server).get('/pets/fake-id')

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ message: 'Pet Not Found' })
  })
})
