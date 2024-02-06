import { Prisma, Pet, Age, Size } from '@prisma/client'

interface PetsQuery {
  age?: Age | null
  size?: Size | null
}
export interface SearchPetsFilters {
  city: string
  query: PetsQuery
}
export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findByCity(data: SearchPetsFilters): Promise<Pet[]>
}
