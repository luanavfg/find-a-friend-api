import { PetsRepository } from '@/repositories/pets-repository'
import { Organization, Pet } from '@prisma/client'
import { PetNotFoundError } from '../errors/pet-not-found-error'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { InvalidOrganizationError } from '../errors/organization-invalid-error'

interface SearchPetsUseCaseRequest {
  id: string
}

interface SearchPetsUseCaseResponse {
  pet: Pet | null
  organizationInfo: Organization
}

export class GetSpecificPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    id,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    const organizationId = pet?.organization_id
    const organization =
      await this.organizationsRepository.findById(organizationId)

    if (!organization) {
      throw new InvalidOrganizationError()
    }
    return { pet, organizationInfo: organization }
  }
}
