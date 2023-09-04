import {apiClient} from "../api/apiConfig";
import {IGenre} from "../interfaces/genre.interface";
import {AxiosResponse} from "axios";

const findAll = async () => {
    return await apiClient.get("/genre");
}

const newOne = async (name: string)=> {
    return await apiClient.post("genre", {name});
}

const deleteOne = (id: number) => {
    return apiClient.delete(`genre/${id}`);
}

const updateOne = (id: number, name: string) => {
    return apiClient.put(`genre/${id}`, {name , genre : name});
}

export default {
    findAll,
    newOne,
    deleteOne,
    updateOne,
};
