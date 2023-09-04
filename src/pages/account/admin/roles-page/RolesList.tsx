import React from "react";
import {IRole} from "../../../../interfaces/role.interface";
import CanActivateRolesAr from "./can-activate-roles_ar.enum";
import {deleteRoleAPI} from "../../../../services/roles.service";
import useToaster from "../../../../hooks/toast/useToaster.hook";
import {AxiosError} from "axios";
import {IException} from "../../../../interfaces/exception.interface";

const RolesList = ({roles , changeRoles }: { roles: IRole[] , changeRoles : (roles:IRole[])=>void}) => {
    const toaster = useToaster();
    const [roleSelected, setRoleSelected] = React.useState<IRole | null>(null);
    const deleteRole = () => {
        deleteRoleAPI(roleSelected?.id as number).then(() => {
            changeRoles(roles.filter(role => role.id !== roleSelected?.id));
            setRoleSelected(null);
            toaster.createToast({
                title: "Success",
                message: "Role Deleted Successfully",
                type : "success",
                duration: 5000
            })
        }).catch((error : AxiosError<IException>) => {
            toaster.createToast({
                message: error.response?.data.message as string || "حدث خطأ ما",
                type: 'error'
            });
        });
    }
    const editRole = () => {

    }
    return (
        <div className="roles-list">
            <div className="overflow-x-auto w-full" dir="ltr">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th className="text-center"></th>
                        <th className="text-center">الصلاحيات</th>
                        <th className="text-right">الاسم</th>
                        <th>#</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        roles.map((role, index) => (
                            <tr className="active" key={`role_${index}`}>
                                <td className="text-center space-x-3">
                                    <label htmlFor="delete-role" className="btn btn-sm text-xs btn-error" onClick={() => {
                                        setRoleSelected(role);
                                    }}>حذف
                                    </label>
                                    <label htmlFor="edit-role" className="btn btn-sm text-xs btn-secondary" onClick={() => {
                                        setRoleSelected(role);
                                    }}>تعديل
                                    </label>
                                </td>
                                <td dir="ltr">
                                    <div className="flex flex-wrap w-full justify-end">
                                        {
                                            role.CanActivate.map((role, index) => (
                                                <span key={index}
                                                      className="badge badge-primary m-1">{CanActivateRolesAr[role]}</span>
                                            ))
                                        }
                                    </div>

                                </td>
                                <td className="text-right">{role.name}</td>
                                <th>{role.id}</th>
                            </tr>
                        ))
                    }

                    </tbody>
                </table>
            </div>

            <input type="checkbox" id="edit-role" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <h3 className="font-bold text-lg">تعديل التصنيف </h3>
                    <input type="text" onChange={(event)=>{
                        if(roleSelected){
                            roleSelected.name = (event.target as HTMLInputElement).value
                        }
                    }} defaultValue={roleSelected?.name} placeholder="اسم التصنيف"
                           className="input input-bordered input-md w-full text-center mt-3"/>
                    <div className="modal-action" dir="ltr">
                        <label htmlFor="edit-role" className="btn ">إلغاء</label>
                        <button className="btn btn-info btn-wide" onClick={editRole}>تعديل</button>
                    </div>
                </div>
            </div>

            <input type="checkbox" id="delete-role" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <h3 className="font-bold text-lg">حذف التصنيف</h3>
                    <p className="text-center">هل انت متأكد من حذف التصنيف <span
                        className="text-error">{roleSelected?.name}</span>؟</p>
                    <div className="modal-action" dir="ltr">
                        <label htmlFor="delete-role" className="btn ">إلغاء</label>
                        <button onClick={deleteRole} className="btn btn-error btn-wide">حذف</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RolesList;
