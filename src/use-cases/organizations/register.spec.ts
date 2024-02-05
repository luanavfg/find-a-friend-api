import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists-error'

let organizationsRepository: InMemoryOrganizationsRepository
let registerUseCase: RegisterUseCase
describe('Register Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    registerUseCase = new RegisterUseCase(organizationsRepository)
  })
  it('should be able to register new organization', async () => {
    const { organization } = await registerUseCase.execute({
      name: 'Organization 1',
      email: 'organization_1@test.com',
      address: 'Fake address',
      password: '123456',
      whatsAppNumber: '123-456-789',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash organization password upon registration', async () => {
    const { organization } = await registerUseCase.execute({
      name: 'Organization 1',
      email: 'organization_1@test.com',
      address: 'Fake address',
      password: '123456',
      whatsAppNumber: '123-456-789',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'organization_1@test.com'

    await registerUseCase.execute({
      name: 'Organization 1',
      email,
      address: 'Fake address',
      password: '123456',
      whatsAppNumber: '123-456-789',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'Organization 1',
        email,
        address: 'Fake address',
        password: '123456',
        whatsAppNumber: '123-456-789',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
