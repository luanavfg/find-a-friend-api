import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: string
  size: 'big' | 'medium' | 'small'
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
    pictures,
    size,
    organizationId,
  }: CreatePetUseCaseRequest) {
    const organization =
      await this.organizationsRepository.findById(organizationId)

    if (!organization) {
      throw new Error('Organization Not Found.')
    }
    await this.petsRepository.create({
      name,
      age,
      size,
      description,
      pictures,
      organization_id: organizationId,
    })
  }
}
