import { prisma } from '@/lib/prisma'
import { PrismaOrganizationsRepository } from '@/repositories/prisma-organizations-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  whatsAppNumber: string
  address: string
}
export async function registerUseCase({
  name,
  email,
  address,
  password,
  whatsAppNumber,
}: RegisterUseCaseRequest) {
  const passwordHash = await hash(password, 6)

  const organizationWithSameEmail = await prisma.organization.findUnique({
    where: {
      email,
    },
  })

  if (organizationWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()

  await prismaOrganizationsRepository.create({
    address,
    email,
    name,
    password_hash: passwordHash,
    whatsApp_number: whatsAppNumber,
  })
}
