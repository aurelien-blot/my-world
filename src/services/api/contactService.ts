import { api } from "./http";
import type {Contact} from "../../models/Contact/contact.ts";
import type {User} from "../../models/User/user.ts";

const path = "/contact";
export const contactService = {

    async getAllForUser(): Promise<Contact[]> {
        const res = await api.get<Contact[]>(path);
        return res.data;
    },

    async searchNewByUsername(username: string): Promise<User> {
        const res = await api.get<User>(`${path}/search/new/${username}`);
        return res.data;
    },

    async inviteContact(userId: number): Promise<Contact> {
        //userId en param
        const res = await api.post<Contact>(`${path}/invite/${userId}`);
        return res.data;
    }

};