import type {User} from "../User/user.ts";

export interface LoginUserResponse {
    success: boolean
    message: string
    user: User
    token: string
}