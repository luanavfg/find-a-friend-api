import { PetsRepository } from '@/repositories/pets-repository'
import { Age, Pet, Size } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  city: string
  age?: Age | null
  size?: Size | null
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    // private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    city,
    age,
    size,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findByCity({
      city,
      query: {
        age,
        size,
      },
    })

    return { pets }
  }
}
