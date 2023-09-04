import CanActivateRoles from "../../../../hooks/can-activate-roles.enum";
import React from "react";
import {createRoleAPI} from "../../../../services/roles.service";
import {AxiosError, AxiosResponse} from "axios";
import {IRole} from "../../../../interfaces/role.interface";
import {IException} from "../../../../interfaces/exception.interface";
import useToaster from "../../../../hooks/toast/useToaster.hook";

const RolesControl = () => {
    const toaster = useToaster();
    const [roles, setRoles] = React.useState<CanActivateRoles[]>([]);
    const [roleName, setRoleName] = React.useState<string>("");
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.currentTarget;
        if (checked) {
            setRoles([...roles, CanActivateRoles[value as keyof typeof CanActivateRoles]]);
        } else {
            setRoles(roles.filter(r => r !== CanActivateRoles[value as keyof typeof CanActivateRoles]))
        }
    }
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoleName(event.currentTarget.value)
    }
    const handleCreateRole = () => {
        if(!roleName) {
            return toaster.createToast({
                message : "يجب ادخال اسم الصلاحية",
                type : "warning"
            })
        }
        createRoleAPI({
            name: roleName,
            CanActivate: roles
        }).then((data: AxiosResponse<IRole>) => {
            setRoles([]);
            setRoleName("");
            toaster.createToast({
                message: "Role created successfully",
                type: "success"
            });
        }).catch((error: AxiosError<IException>) => {
            toaster.createToast({
                message: error.response?.data.message as string,
                type: 'error'
            })
        });
    }
    return (
        <div>
            <label htmlFor="create-role" className="btn">انشاء صلاحية</label>
            <input type="checkbox" id="create-role" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box">
                    <label htmlFor="create-role"
                           className="btn btn-sm btn-error btn-circle absolute left-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">انشاء صلاحية</h3>
                    <div className="overflow-y-scroll overflow-x-hidden max-h-80 px-3" dir="ltr">
                        <div dir="rtl">
                            <div className="form-control w-full">
                                <label className="cursor-pointer label">
                                    <span className="label-text">اضافة الاعمال</span>
                                    <input
                                        onChange={handleInputChange}
                                        value="Create-Manga" type="checkbox" className="toggle toggle-primary"/>
                                </label>
                            </div>
                            <div className="form-control w-full">
                                <label className="cursor-pointer label">
                                    <span className="label-text">اضافة الفصول</span>
                                    <input onChange={handleInputChange} value="Create-Chapter" type="checkbox"
                                           className="toggle toggle-primary"/>
                                </label>
                            </div>
                            <div className="form-control w-full">
                                <label className="cursor-pointer label">
                                    <span className="label-text">اضافة الاخبار</span>
                                    <input onChange={handleInputChange} value="Create-News" type="checkbox"
                                           className="toggle toggle-primary"/>
                                </label>
                            </div>

                            <div className="form-control w-full">
                                <label className="cursor-pointer label">
                                    <span className="label-text">حذف المانجا</span>
                                    <input onChange={handleInputChange} value="Delete-Manga" type="checkbox"
                                           className="toggle toggle-primary"/>
                                </label>
                            </div>

                            <div className="form-control w-full">
                                <label className="cursor-pointer label">
                                    <span className="label-text">حذف الفصل</span>
                                    <input onChange={handleInputChange} value="Delete-Chapter" type="checkbox"
                                           className="toggle toggle-primary"/>
                                </label>
                            </div>


                            <div className="form-control w-full">
                                <label className="cursor-pointer label">
                                    <span className="label-text">حذف المانجا نهائيا</span>
                                    <input onChange={handleInputChange} value="Confirm-Manga-Delete" type="checkbox"
                                           className="toggle toggle-primary"/>
                                </label>
                            </div>

                            <div className="form-control w-full">
                                <label className="cursor-pointer label">
                                    <span className="label-text">حذف الفصل نهائيا</span>
                                    <input onChange={handleInputChange} value="Confirm-Chapter-Delete" type="checkbox"
                                           className="toggle toggle-primary"/>
                                </label>
                            </div>

                            <div className="form-control w-full">
                                <label className="cursor-pointer label">
                                    <span className="label-text">تعديل المانجا</span>
                                    <input onChange={handleInputChange} value="Edit-Manga" type="checkbox"
                                           className="toggle toggle-primary"/>
                                </label>
                            </div>

                            <div className="form-control w-full">
                                <label className="cursor-pointer label">
                                    <span className="label-text">تعديل الفصول</span>
                                    <input onChange={handleInputChange} value="Edit-Chapter" type="checkbox"
                                           className="toggle toggle-primary"/>
                                </label>
                            </div>

                            <div className="form-control w-full">
                                <label className="cursor-pointer label">
                                    <span className="label-text">تعديل الاخبار</span>
                                    <input onChange={handleInputChange} value="Edit-News" type="checkbox"
                                           className="toggle toggle-primary"/>
                                </label>
                            </div>

                            <div className="form-control w-full">
                                <label className="cursor-pointer label">
                                    <span className="label-text">شحن العملات</span>
                                    <input onChange={handleInputChange} value="Recharge-Coins" type="checkbox"
                                           className="toggle toggle-primary"/>
                                </label>
                            </div>

                            <div className="form-control w-full">
                                <label className="cursor-pointer label">
                                    <span className="label-text-alt">مشرف</span>
                                    <input onChange={handleInputChange} value="Moderator" type="checkbox"
                                           className="toggle toggle-primary"/>
                                </label>
                            </div>

                            <div className="form-control w-full">
                                <label className="cursor-pointer label">
                                    <span className="label-text">مدير</span>
                                    <input onChange={handleInputChange} value="Admin" type="checkbox"
                                           className="toggle toggle-primary"/>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="input-group w-full mt-5" dir="ltr">
                            <span className="btn btn-primary w-20" onClick={handleCreateRole}>انشاء</span>
                            <input
                                onChange={handleChangeName}
                                type="text" placeholder="اسم الصلاحية" className="input input-primary w-full"
                                dir="rtl"/>
                        </label>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default RolesControl
