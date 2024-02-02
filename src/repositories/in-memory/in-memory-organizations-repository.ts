import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public organizations: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const organization: Organization = {
      id: 'organization-1',
      name: data.name,
      address: data.address,
      email: data.email,
      whatsApp_number: data.whatsApp_number,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.organizations.push(organization)
    return organization
  }

  async findByEmail(email: string) {
    const organization = this.organizations.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async findById(id: string) {
    const organization = this.organizations.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }
}
