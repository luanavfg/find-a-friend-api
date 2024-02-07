import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './searchPets'

let petsRepository: InMemoryPetsRepository
let searchPetsUseCase: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    searchPetsUseCase = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets by city', async () => {
    await petsRepository.create({
      name: 'fake pet 01',
      age: 'adult',
      description: 'Friendly pet',
      city: 'fake-city-01',
      organization_id: 'fake-org-01',
      size: 'big',
      pictures: [],
    })

    await petsRepository.create({
      name: 'fake pet 02',
      age: 'cub',
      description: 'Angry pet',
      city: 'fake-city-02',
      organization_id: 'fake-org-02',
      size: 'small',
      pictures: [],
    })

    const { pets } = await searchPetsUseCase.execute({
      city: 'fake-city-01',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(expect.objectContaining({ name: 'fake pet 01' }))
  })

  it('should be able to search pets by city, age and size', async () => {
    await petsRepository.create({
      name: 'fake pet 01',
      age: 'adult',
      description: 'Friendly pet',
      city: 'fake-city-01',
      organization_id: 'fake-org-01',
      size: 'big',
      pictures: [],
    })

    await petsRepository.create({
      name: 'fake pet 02',
      age: 'cub',
      description: 'Angry pet',
      city: 'fake-city-01',
      organization_id: 'fake-org-01',
      size: 'small',
      pictures: [],
    })

    const { pets } = await searchPetsUseCase.execute({
      city: 'fake-city-01',
      query: {
        age: 'cub',
        size: 'small',
      },
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(expect.objectContaining({ name: 'fake pet 02' }))
  })

  it.skip('should not be able to search a pet without choosing a city', async () => {
    await petsRepository.create({
      name: 'fake pet 03',
      age: 'elderly',
      description: 'Blind pet',
      city: '',
      organization_id: 'fake-org-01',
      size: 'medium',
      pictures: [],
    })

    const { pets } = await searchPetsUseCase.execute({
      city: 'fake-city-01',
      query: {
        age: 'cub',
        size: 'small',
      },
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(expect.objectContaining({ name: 'fake pet 02' }))
  })
})
