import request from 'supertest'
import { app } from '@/app'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { hash } from 'bcryptjs'

describe('[E2E] Search Pets', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  afterEach(async () => {
    const petsRepository = new PrismaPetsRepository()
    await petsRepository.deleteAll()
  })
  it('should be able to search pets by city', async () => {
    const organizationsRepository = new PrismaOrganizationsRepository()
    const organization = await organizationsRepository.create({
      name: faker.company.name(),
      email: faker.internet.email(),
      password_hash: await hash('123456', 6),
      whatsApp_number: faker.phone.number(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
    })

    const city = 'fake-city-01'
    const petsRepository = new PrismaPetsRepository()
    await petsRepository.create({
      name: faker.person.firstName(),
      description: faker.lorem.paragraph(),
      age: 'adult',
      size: 'big',
      city,
      organization_id: organization.id,
      pictures: [],
    })
    await petsRepository.create({
      name: faker.person.firstName(),
      description: faker.lorem.paragraph(),
      age: 'adult',
      size: 'big',
      city,
      organization_id: organization.id,
      pictures: [],
    })
    await petsRepository.create({
      name: faker.person.firstName(),
      description: faker.lorem.paragraph(),
      age: 'adult',
      size: 'big',
      city: 'fake-city-02',
      organization_id: organization.id,
      pictures: [],
    })

    const response = await request(app.server).get(`/pets/city/${city}`)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should be able to search pets by city and characteristics', async () => {
    const organizationsRepository = new PrismaOrganizationsRepository()
    const organization = await organizationsRepository.create({
      name: faker.company.name(),
      email: faker.internet.email(),
      password_hash: await hash('123456', 6),
      whatsApp_number: faker.phone.number(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
    })

    const city = 'fake-city-01'
    const petsRepository = new PrismaPetsRepository()
    await petsRepository.create({
      name: faker.person.firstName(),
      description: faker.lorem.paragraph(),
      age: 'adult',
      size: 'big',
      city,
      organization_id: organization.id,
      pictures: [],
    })
    await petsRepository.create({
      name: faker.person.firstName(),
      description: faker.lorem.paragraph(),
      age: 'cub',
      size: 'big',
      city,
      organization_id: organization.id,
      pictures: [],
    })
    await petsRepository.create({
      name: faker.person.firstName(),
      description: faker.lorem.paragraph(),
      age: 'adult',
      size: 'big',
      city: 'fake-city-02',
      organization_id: organization.id,
      pictures: [],
    })

    const responseByAge = await request(app.server)
      .get(`/pets/city/${city}`)
      .query({
        age: 'adult',
      })
      .send()

    expect(responseByAge.body.pets).toHaveLength(1)

    const responseBySize = await request(app.server)
      .get(`/pets/city/${city}`)
      .query({
        size: 'big',
      })
      .send()

    expect(responseBySize.body.pets).toHaveLength(2)
  })

  it('should not be able to search pets without city', async () => {
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
    await petsRepository.create({
      name: faker.person.firstName(),
      description: faker.lorem.paragraph(),
      age: 'adult',
      size: 'big',
      city: 'fake-city-01',
      organization_id: organization.id,
      pictures: [],
    })

    const response = await request(app.server).get(`/pets/city`)
    expect(response.body).toEqual({ message: 'Pet Not Found' })
  })
})
