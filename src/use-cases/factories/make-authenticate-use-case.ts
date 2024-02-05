import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { AuthenticateUseCase } from '../organizations/authenticate'

export function makeAuthenticateUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new AuthenticateUseCase(prismaOrganizationsRepository)

  return useCase
}
