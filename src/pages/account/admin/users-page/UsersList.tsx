import React from "react";
import soloLeveling from "../../../../assets/images/solo-leveling_.png";
import {IUser} from "../../../../interfaces/user.interface";
import moment from "moment";
const UsersList = ({users} : {users:IUser[]}) => {
    return <>
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                <tr>
                    <th>
                      #
                    </th>
                    <th className="text-center">الاسم</th>
                    <th className="text-center">البريد الاكتروني</th>
                    <th className="text-center">تاريخ التسجيل</th>
                    <th className="text-center">النبذه الشخصية</th>
                    <th className="text-center">العملات</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>

                {
                    users.map((user, index) => (
                        <tr className="active">
                            <th>
                                <label>
                                    {user.id}
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center ">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={user.avatar_url||soloLeveling} className="object-cover" alt="Avatar Tailwind CSS Component"/>
                                        </div>
                                    </div>
                                    <div className="mr-2">
                                        <div className="font-bold text-right">{user.username}</div>
                                        <div className="text-sm opacity-50 text-right" dir="ltr">{user.role_name}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="text-center" dir="ltr">
                                {user.email}
                            </td>
                            <td className="text-center">{moment(user.createdAt).locale("ar").fromNow()}</td>
                            <td className="text-center">{user.bio || "لا يوجد"}</td>
                            <td className="text-center">{user.coins}</td>
                            <th>
                                <button className="btn btn-info btn-xs">التفاصيل</button>
                            </th>

                        </tr>
                    ))
                }


                </tbody>


            </table>
        </div>
    </>
}
export default UsersList
