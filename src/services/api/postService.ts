import { api } from "./http";
import type {Post} from "../../models/Post/post.ts";

const path = "/post";
export const postService = {

    async getAll(): Promise<Post[]> {
        const res = await api.get<Post[]>(path);
        return res.data;
    },

    async create(post: Post, files: File[]): Promise<Post> {
        const formData = new FormData();
        formData.append(
            "post",
            new Blob([JSON.stringify(post)], {type: "application/json"})
        );
        if(files!=null && files.length>0){
            files.forEach((file) => {
                formData.append("files", file);
            });
        }

        const res = await api.post<Post>(path, formData, {
            headers: {"Content-Type": "multipart/form-data"},
        });

        return res.data;
    },

    async update(post: Post, files: File[]): Promise<Post> {
        const formData = new FormData();
        formData.append(
            "post",
            new Blob([JSON.stringify(post)], {type: "application/json"})
        );
        if(files!=null && files.length>0){
            files.forEach((file) => {
                formData.append("files", file);
            });
        }

        const res = await api.put<Post>(path+"/"+post.id, formData, {
            headers: {"Content-Type": "multipart/form-data"},
        });

        return res.data;
    },

    async delete(postId: number): Promise<void> {
        await api.delete<void>(`${path}/${postId}`);
    },

    async deletePostPicture(postId: number, pictureId: number): Promise<void> {
        await api.delete<void>(`${path}/pic/${postId}/${pictureId}`);
    }

};