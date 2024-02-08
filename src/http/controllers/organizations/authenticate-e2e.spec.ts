import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'

describe('[E2E] Authenticate', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/organizations').send({
      name: faker.company.name(),
      email: 'pet.friend@org.com',
      password: '1234567890',
      whatsAppNumber: faker.phone.number(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'pet.friend@org.com',
      password: '1234567890',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })

  it('should not be able to authenticate with wrong credentials', async () => {
    await request(app.server).post('/organizations').send({
      name: faker.company.name(),
      email: 'pet.look@org.com',
      password: '1234567890',
      whatsAppNumber: faker.phone.number(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'pet.look@org.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual({
      message: 'Invalid credentials error.',
    })
  })
})
