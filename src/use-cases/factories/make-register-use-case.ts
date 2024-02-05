import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { RegisterUseCase } from '../organizations/register'

export function makeRegisterUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new RegisterUseCase(prismaOrganizationsRepository)

  return useCase
}
