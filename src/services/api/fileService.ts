import { api } from "./http";

const path = "/file";
export const fileService = {

    async getPicture(filePath : string,signal?: AbortSignal): Promise<Blob> {
        const res = await api.get(path, {
            params: { "filepath" : filePath },
            responseType: "blob",
            signal
        });
        return res.data;
    },

};