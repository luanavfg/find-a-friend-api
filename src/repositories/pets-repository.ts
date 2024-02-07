import { SearchQuery } from '@/http/controllers/pets/search-pets'
import { Prisma, Pet } from '@prisma/client'

export interface SearchPetsFilters {
  city: string
  query?: SearchQuery
}
export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findByCity(data: SearchPetsFilters): Promise<Pet[]>
}
