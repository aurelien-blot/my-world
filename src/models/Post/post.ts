import type {User} from "../User/user.ts";
import type {PostPicture} from "./postPicture.ts";

export interface Post {
    id? : number
    content: string
    creationBy: User
    creationTime?: Date
    pictureList? : PostPicture[]
    files: File[]
}