import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetSpecificPetUseCase } from '../pets/getSpecificPet'

export function makeGetSpecificPetUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const petsRepository = new PrismaPetsRepository()

  const useCase = new GetSpecificPetUseCase(
    petsRepository,
    organizationsRepository,
  )

  return useCase
}
