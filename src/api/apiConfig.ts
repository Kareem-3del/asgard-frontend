import axios from "axios";

const apiConfig = {
    apiUrl: import.meta.env.VITE_API_URL,
    api2Url: import.meta.env.VITE_API_URL_,
};
let api = "http://147.182.205.76:3000"
if(window.location.hostname === "localhost" || window.location.hostname === "192.168.1.3"){
    api = "http://192.168.1.3:3000"
}
export let axiosConfig = {
    baseURL: api,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },

    timeout: 999999999
};

export const apiClient = axios.create(axiosConfig);
