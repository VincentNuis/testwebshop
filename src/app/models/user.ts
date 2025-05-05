export class User {
    constructor(
        public id: number,
        public email: string,
        public roles: string[]
    ) { }

    hasRole(role: string): boolean {
        return this.roles.includes(role);
    }
}