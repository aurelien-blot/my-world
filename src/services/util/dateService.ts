import dayjs from "dayjs";

export const dateService = {

    formatDate(date : Date) : string {
        const dateD = dayjs(date);
        return dateD.format("DD/MM/YYYY HH:mm")
    }
};