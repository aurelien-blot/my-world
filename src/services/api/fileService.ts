import { api } from "./http";

const path = "/file";
export const fileService = {

    async downloadMiniPicture(pictureId : number,signal?: AbortSignal): Promise<Blob> {
        const res = await api.get(`${path}/miniature/${pictureId}`, {
            responseType: "blob",
            signal
        });
        return res.data;
    },

    async downloadResizedPicture(pictureId : number,signal?: AbortSignal): Promise<Blob> {
        const res = await api.get(`${path}/resized/${pictureId}`, {
            responseType: "blob",
            signal
        });
        return res.data;
    },

    async downloadOriginalPicture(pictureId : number, signal? : AbortSignal) : Promise<Blob> {
        const res = await api.get(`${path}/original/${pictureId}`, {
            responseType: "blob",
            signal
        });
        return res.data;
    },

    async checkPicturesStatus() : Promise<void> {
        await api.get(`${path}/check-picture-status`);
    }

};