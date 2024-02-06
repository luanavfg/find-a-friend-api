import { Prisma, Pet, Age, Size } from '@prisma/client'

export interface SearchPetsFilters {
  city: string
  age: Age | null
  size: Size | null
}
export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findByCity(data: SearchPetsFilters): Promise<Pet[]>
}
