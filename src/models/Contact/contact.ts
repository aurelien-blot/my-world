import type {User} from "../User/user.ts";

export interface Contact {
    user : User,
    contact : User,
    contactStatus : 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'BLOCKED'
}