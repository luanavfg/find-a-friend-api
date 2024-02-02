import { describe, it, expect } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate organization', async () => {
    const organizationsRepository = new InMemoryOrganizationsRepository()
    const authenticateUseCase = new AuthenticateUseCase(organizationsRepository)

    await organizationsRepository.create({
      name: 'Organization 1',
      email: 'organization_1@test.com',
      address: 'Fake address',
      password_hash: await hash('123456', 6),
      whatsApp_number: '123-456-789',
    })
    const { organization } = await authenticateUseCase.execute({
      email: 'organization_1@test.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate organization with wrong email', async () => {
    const organizationsRepository = new InMemoryOrganizationsRepository()
    const authenticateUseCase = new AuthenticateUseCase(organizationsRepository)

    expect(() =>
      authenticateUseCase.execute({
        email: 'wrong-email@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate organization with wrong password', async () => {
    const organizationsRepository = new InMemoryOrganizationsRepository()
    const authenticateUseCase = new AuthenticateUseCase(organizationsRepository)

    await organizationsRepository.create({
      name: 'Organization 1',
      email: 'organization_1@test.com',
      address: 'Fake address',
      password_hash: await hash('123456', 6),
      whatsApp_number: '123-456-789',
    })

    expect(() =>
      authenticateUseCase.execute({
        email: 'organization_1@test.com',
        password: '1234567890',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
