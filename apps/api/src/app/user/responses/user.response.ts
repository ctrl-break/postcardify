import { User } from '@prisma/client';

const blackListedFields: Array<keyof User> = ['password', 'provider', 'role', 'isBlocked'];

export class UserResponse {
    constructor(user: User) {
        const resp = Object.fromEntries(
            Object.entries(user).filter(([key]) => !blackListedFields.includes(key as keyof User)),
        );
        Object.assign(this, resp);
    }
}
