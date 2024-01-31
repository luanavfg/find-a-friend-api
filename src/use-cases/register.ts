import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  whatsAppNumber: string
  address: string
}

export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    address,
    password,
    whatsAppNumber,
  }: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, 6)

    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    await this.organizationsRepository.create({
      address,
      email,
      name,
      password_hash: passwordHash,
      whatsApp_number: whatsAppNumber,
    })
  }
}
