export class OrganizationNotFoundError extends Error {
  constructor() {
    super('Organization Not Found')
  }
}
