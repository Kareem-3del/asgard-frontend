import React, {useEffect} from "react";
import UsersList from "./UsersList";
import {getUsersAPI} from "../../../../services/users.service";
import {AxiosError} from "axios";
import {IException} from "../../../../interfaces/exception.interface";
import useToaster from "../../../../hooks/toast/useToaster.hook";

const UsersAdminPage = () => {
    const [users, setUsers] = React.useState([]);
    const toaster = useToaster();
    useEffect(()=>{
        getUsersAPI().then(res => {
            setUsers(res.data);
        }).catch((err :AxiosError<IException>) => {
            toaster.createToast({
                message: err.response?.data.message as string || "حدث خطأ ما",
                type: 'error'
            })
        });
    },[])
    return (
        <div className="w-full py-3">
            <UsersList users={users}/>
        </div>
    )
}
export default UsersAdminPage;
