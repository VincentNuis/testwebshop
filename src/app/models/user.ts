export class User {
  constructor(
    public id: number | null = null,
    public email: string = '',
    public roles: string[] = [],
    public password?: string
  ) {}

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }
}
