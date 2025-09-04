import { api } from "./http";
import type {LoginUserRequest} from "../../models/Login/loginUserRequest.ts";
import type {LoginUserResponse} from "../../models/Login/loginUserResponse.ts";

const path = "/login";
export const loginService = {

    async login(body: LoginUserRequest): Promise<LoginUserResponse> {
        const res = await api.post<LoginUserResponse>(`${path}`, body);
        return res.data;
    },
};