import axios from "axios";

const apiConfig = {
    apiUrl: import.meta.env.VITE_API_URL,
    api2Url: import.meta.env.VITE_API_URL_,
};

let api = apiConfig.apiUrl;
if (window.location.hostname === "localhost" || window.location.hostname === "192.168.1.3" || window.location.hostname === "127.0.0.1") {
    api = apiConfig.api2Url;
}
console.log("api", api);
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
