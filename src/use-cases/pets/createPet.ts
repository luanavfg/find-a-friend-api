import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrganizationNotFoundError } from '../errors/organization-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  city: string
  age?: 'cub' | 'adult' | 'elderly' | null
  size?: 'big' | 'medium' | 'small' | null
  pictures: Array<string>
  organizationId: string
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    name,
    age,
    description,
    city,
    pictures,
    size,
    organizationId,
  }: CreatePetUseCaseRequest) {
    const organization =
      await this.organizationsRepository.findById(organizationId)

    if (!organization) {
      throw new OrganizationNotFoundError()
    }
    const pet = await this.petsRepository.create({
      name,
      city,
      age,
      size,
      description,
      pictures,
      organization_id: organizationId,
    })

    return { pet }
  }
}
