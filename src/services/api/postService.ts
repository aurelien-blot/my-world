import { api } from "./http";
import type {Post} from "../../models/Post/post.ts";

const path = "/post";
export const postService = {

    async getAll(): Promise<Post[]> {
        const res = await api.get<Post[]>(path);
        return res.data;
    },

    async create(post: Omit<Post, "id">): Promise<Post> {
        const res = await api.post<Post>(path, post);
        return res.data;
    },

};