import { Pet, Prisma, Organization } from '@prisma/client'
import { PetsRepository, SearchPetsFilters } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []
  public organizations: Organization[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age ? data.age : null,
      city: data.city,
      description: data.description ? data.description : null,
      pictures: [],
      size: data.size ? data.size : null,
      organization_id: data.organization_id,
      created_at: new Date(),
    }

    this.pets.push(pet)
    return pet
  }

  async findById(id: string) {
    const pet = this.pets.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findByCity({ city, query }: SearchPetsFilters) {
    const petsFiltered = this.pets.filter((pet) => pet.city === city)

    if (!query) {
      return petsFiltered
    }

    const petsByCharacteristic = petsFiltered.filter(
      (pet) =>
        (!query.age || pet.age === query?.age) &&
        (!query.size || pet.size === query?.size),
    )

    return petsByCharacteristic
  }
}
