import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository, SearchPetsFilters } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findByCity({ city, query }: SearchPetsFilters) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
        ...query,
      },
    })

    return pets
  }
}
