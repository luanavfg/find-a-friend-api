import { PetsRepository } from '@/repositories/pets-repository'
import { Age, Pet, Size } from '@prisma/client'

interface PetsQuery {
  age: Age | null
  size: Size | null
}
interface SearchPetsUseCaseRequest {
  city: string
  query?: PetsQuery
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    query,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findByCity({
      city,
      query,
    })

    return { pets }
  }
}
