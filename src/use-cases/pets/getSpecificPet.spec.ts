import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { GetSpecificPetUseCase } from './getSpecificPet'
import { hash } from 'bcryptjs'
import { PetNotFoundError } from '../errors/pet-not-found-error'
import { InvalidOrganizationError } from '../errors/organization-invalid-error'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let getSpecificPetUseCase: GetSpecificPetUseCase

describe('Get Specific Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    getSpecificPetUseCase = new GetSpecificPetUseCase(
      petsRepository,
      organizationsRepository,
    )
  })

  it('should be able to get a single pet details', async () => {
    const organizationCreated = await organizationsRepository.create({
      name: 'fake org',
      email: 'org@test.com',
      address: 'Fake org address',
      password_hash: await hash('123456', 6),
      whatsApp_number: '48-123-456-789',
      cep: '88907-987',
    })

    const petCreated = await petsRepository.create({
      name: 'fake pet 01',
      age: 'adult',
      description: 'Friendly pet',
      city: 'fake-city-01',
      organization_id: organizationCreated.id,
      size: 'big',
      pictures: [],
    })

    const { organizationInfo, pet } = await getSpecificPetUseCase.execute({
      id: petCreated.id,
    })

    expect(pet?.name).toEqual('fake pet 01')
    expect(organizationInfo.id).toEqual(organizationCreated.id)
    expect(organizationInfo.whatsApp_number).toEqual('48-123-456-789')
  })

  it('should not be able to get a pet with an invalid id', async () => {
    const organizationCreated = await organizationsRepository.create({
      name: 'fake org',
      email: 'org@test.com',
      address: 'Fake org address',
      password_hash: await hash('123456', 6),
      whatsApp_number: '48-123-456-789',
      cep: '88907-987',
    })

    await petsRepository.create({
      name: 'fake pet 01',
      age: 'adult',
      description: 'Friendly pet',
      city: 'fake-city-01',
      organization_id: organizationCreated.id,
      size: 'big',
      pictures: [],
    })

    expect(() =>
      getSpecificPetUseCase.execute({
        id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })

  it('should not be able to get a pet with an invalid organization', async () => {
    const { id } = await petsRepository.create({
      name: 'fake pet 01',
      age: 'adult',
      description: 'Friendly pet',
      city: 'fake-city-01',
      organization_id: 'fake-org-id',
      size: 'big',
      pictures: [],
    })

    expect(() =>
      getSpecificPetUseCase.execute({
        id,
      }),
    ).rejects.toBeInstanceOf(InvalidOrganizationError)
  })
})
