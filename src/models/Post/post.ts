import type {User} from "../User/user.ts";

export interface Post {
    id? : number
    content: string
    creationBy: User
    creationTime?: Date
    files: File[]
}