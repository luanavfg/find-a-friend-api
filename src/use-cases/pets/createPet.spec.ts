import { describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { CreatePetUseCase } from './createPet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InvalidOrganizationError } from '../errors/organization-invalid-error'

describe('Create Pet Use Case', () => {
  it('should be able to create a new pet', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const organizationsRepository = new InMemoryOrganizationsRepository()
    const createPetUseCase = new CreatePetUseCase(
      petsRepository,
      organizationsRepository,
    )

    const { id } = await organizationsRepository.create({
      name: 'Organization 1',
      email: 'organization_1@test.com',
      address: 'Fake address',
      cep: '123-456-345',
      password_hash: await hash('123456', 6),
      whatsApp_number: '123-456-789',
      created_at: new Date(),
    })

    const { pet } = await createPetUseCase.execute({
      name: 'fake name',
      age: 'adult',
      description: 'Friendly pet',
      city: 'fake city',
      organizationId: id,
      size: 'big',
      pictures: [],
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet that is not associated with an existing organization', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const organizationsRepository = new InMemoryOrganizationsRepository()
    const createPetUseCase = new CreatePetUseCase(
      petsRepository,
      organizationsRepository,
    )

    expect(() =>
      createPetUseCase.execute({
        name: 'fake name',
        age: 'adult',
        city: 'fake city',
        description: 'Friendly pet',
        organizationId: 'fake-org-id',
        size: 'big',
        pictures: [],
      }),
    ).rejects.toBeInstanceOf(InvalidOrganizationError)
  })
})
