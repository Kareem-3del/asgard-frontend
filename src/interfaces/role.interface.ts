import CanActivateRoles from "../hooks/can-activate-roles.enum";

export interface IRole {
    id: number;

    name: string;

    CanActivate: CanActivateRoles[];
}
