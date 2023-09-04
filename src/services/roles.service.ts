import {apiClient} from "../api/apiConfig";
import CanActivateRoles from "../hooks/can-activate-roles.enum";
export interface ICreateRole {
    name : string,
    CanActivate : CanActivateRoles[]
}
export const getRolesAPI = async () => {

    return await apiClient.get("/roles");
}

export const getRoleAPI = async (id: number) => {
    return await apiClient.get(`/roles/${id}`);
}

export const createRoleAPI = async (role: ICreateRole) => {
    return await apiClient.post("/roles", role);
}

export const updateRoleAPI = async (id: number, role: ICreateRole) => {
    return await apiClient.put(`/roles/${id}`, role);
}

export const deleteRoleAPI = async (id: number) => {
    return await apiClient.delete(`/roles/${id}`);
}
