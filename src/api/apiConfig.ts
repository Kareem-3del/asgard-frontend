import axios from "axios";

const apiConfig = {
    apiUrl: import.meta.env.VITE_API_URL,
    api2Url: import.meta.env.VITE_API_URL_,
};

export let axiosConfig = {
    baseURL: "http://147.182.205.76:3000",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },

    timeout: 999999999
};

export const apiClient = axios.create(axiosConfig);
