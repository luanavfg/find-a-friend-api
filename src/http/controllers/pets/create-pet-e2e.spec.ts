import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'

describe('[E2E] Create Pet', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new pet', async () => {
    await request(app.server).post('/organizations').send({
      name: faker.company.name(),
      email: 'pet.friend@org.com',
      password: '1234567890',
      whatsAppNumber: faker.phone.number(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
    })

    const { body } = await request(app.server).post('/sessions').send({
      email: 'pet.friend@org.com',
      password: '1234567890',
    })

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${body.token}`)
      .send({
        name: faker.person.firstName(),
        description: faker.lorem.paragraph(),
        age: 'adult',
        size: 'big',
        city: faker.location.city(),
        pictures: [],
      })
    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to create a pet without organization login', async () => {
    const response = await request(app.server)
      .post('/pets')

      .send({
        name: faker.person.firstName(),
        description: faker.lorem.paragraph(),
        age: 'adult',
        size: 'big',
        city: faker.location.city(),
        pictures: [],
      })
    expect(response.statusCode).toEqual(401)
    expect(response.body).toEqual({ message: 'Unauthorized' })
  })
})
