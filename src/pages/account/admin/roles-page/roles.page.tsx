import React from "react";
import RolesList from "./RolesList";
import {getRolesAPI} from "../../../../services/roles.service";
import {IRole} from "../../../../interfaces/role.interface";
import {AxiosResponse} from "axios";
import RolesControl from "./RolesControl";

const RolesAdminPage = () => {
    const [roles, setRoles] = React.useState<IRole[]>([]);
    getRolesAPI().then(({data} : AxiosResponse<IRole[]>) => {
        setRoles(data);
    });
    return (
        <div className="py-3 w-full space-y-3">
            <RolesList roles={roles} changeRoles={()=>{}}/>
            <RolesControl/>
        </div>
    )
}

export default RolesAdminPage;
