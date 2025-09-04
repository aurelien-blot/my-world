import { api } from "./http";

const path = "/post";
export const testService = {

    async test(): Promise<boolean> {
        const res = await api.get<boolean>(path);
        return res.data || false;
    }
};