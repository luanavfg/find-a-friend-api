import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists-error'
import { Organization } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  whatsAppNumber: string
  address: string
  cep: string
}

interface RegisterUseCaseResponse {
  organization: Organization
}

export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    address,
    password,
    whatsAppNumber,
    cep,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      address,
      email,
      name,
      password_hash: passwordHash,
      whatsApp_number: whatsAppNumber,
      cep,
    })

    return { organization }
  }
}
