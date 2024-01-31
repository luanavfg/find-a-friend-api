import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaOrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }
}
