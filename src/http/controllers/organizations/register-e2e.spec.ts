import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'

describe('[E2E] Register Organization', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register new organization', async () => {
    const response = await request(app.server)
      .post('/organizations')
      .send({
        name: faker.company.name(),
        email: faker.internet.email(),
        password: faker.string.alphanumeric(6),
        whatsAppNumber: faker.phone.number(),
        address: faker.location.streetAddress(),
        cep: faker.location.zipCode(),
      })

    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to register new organization with duplicated email', async () => {
    const email = 'rex@org.com'
    await request(app.server)
      .post('/organizations')
      .send({
        name: faker.company.name(),
        email,
        password: faker.string.alphanumeric(6),
        whatsAppNumber: faker.phone.number(),
        address: faker.location.streetAddress(),
        cep: faker.location.zipCode(),
      })

    const response = await request(app.server)
      .post('/organizations')
      .send({
        name: faker.company.name(),
        email,
        password: faker.string.alphanumeric(6),
        whatsAppNumber: faker.phone.number(),
        address: faker.location.streetAddress(),
        cep: faker.location.zipCode(),
      })

    expect(response.statusCode).toEqual(409)
    expect(response.body).toEqual({
      message: 'E-mail already exists',
    })
  })
})
