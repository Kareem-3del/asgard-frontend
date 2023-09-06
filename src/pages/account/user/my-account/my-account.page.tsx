import soloLeveling from "../../../../assets/images/solo-leveling_.png";
import React, {useEffect} from "react";
import {FaPhotoVideo, MdPhotoSizeSelectActual} from "react-icons/all";
import useAuth from "../../../../hooks/auth/useAuth.hook";
import service from "../../../../services/auth.service";
import {AxiosResponse} from "axios";
import {IUser} from "../../../../interfaces/user.interface";
import useToaster from "../../../../hooks/toast/useToaster.hook";
import {getUserThunk} from "../../../../reducers/auth/actions/auth.actions";
import store from "../../../../store";

const MyAccountPage = () => {
    const toaster = useToaster();
    const {user} = useAuth();
    const [bio, setBio] = React.useState<string>(user?.bio || "");
    const [email, setEmail] = React.useState<string|undefined>(user?.email || undefined);
    const [username, setUsername] = React.useState<string|undefined>(undefined);
    const [notifications, setNotifications] = React.useState<boolean>(user?.allow_notifications || false);
    const [notificationsSound, setNotificationsSound] = React.useState<boolean>(false);
    const [allowMessages, setAllowMessages] = React.useState<boolean>(user?.allow_messages || false);

    function handleChangeAvatar(avatar: File) {
        if (avatar) {
            service.changeAvatar(avatar).then((res:AxiosResponse<string>) => {
                store.dispatch(getUserThunk());
                toaster.createToast({
                    message: "تم تغير الصورة بنجاح",
                    type: "success"
                })
            }).catch((err) => {
                toaster.createToast({
                    message: "حدث خطأ ما",
                    type: "error"
                })
                console.log(err)
            });
        }
    }

    function handleChangeCover(cover: File) {
        if (cover) {
            service.changeCover(cover).then((res:AxiosResponse<string>) => {
                store.dispatch(getUserThunk());
                toaster.createToast({
                    message: "تم تغير الغلاف بنجاح",
                    type: "success"
                })
            }).catch((err) => {
                toaster.createToast({
                    message: "حدث خطأ ما",
                    type: "error"
                })
            });
        }
    }

    function handleChangeInfo() {
            service.updateUserInfo({bio, username , email , allow_notifications : notifications , allow_messages : allowMessages}).then((res:AxiosResponse<IUser>) => {
                store.dispatch(getUserThunk());
                toaster.createToast({
                    message: "تم تغير البيانات بنجاح",
                    type: "success"
                });
                getUserThunk()
            }).catch((err) => {
                toaster.createToast({
                    message: "حدث خطأ ما",
                    type: "error"
                })
                console.log(err)
            });
    }

    useEffect(() => {
        setEmail(user?.email || undefined);
        setUsername(user?.username || undefined);
        setBio(user?.bio || "");
        setNotifications(user?.allow_notifications || false);
        setAllowMessages(user?.allow_messages || false);
    }, [user]);



    return (
        user && <div className="mx-auto w-full space-y-3 mb-3 my-2">

            <div className="flex max-sm:flex-col bg-base-300 rounded justify-center items-center p-3">
                <div
                    className="flex-none max-sm:w-full max-sm:mb-3 rounded bg-base-200 w-72 flex flex-col items-center   space-y-2">
                    <div className="avatar  mt-auto pt-4">
                        <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img alt="solo-leveling" src={user.avatar_url || soloLeveling}/>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-semibold  w-60 flex justify-center items-center">
                            <span className="text-primary">{user.username}</span>
                        </h1>
                        <h2 className="text-sm">الحالة : <span
                            className="text-accent">{user.role_name || "مستخدم"}</span></h2>
                    </div>
                    <ul className="menu bg-base-100 w-full">
                        <li className="flex"><p className="text-center justify-center flex items-center">

                            <label className="w-32">
                                تغير صورتي

                                <input hidden
                                       onChange={(e) => {
                                           if (e.target.files?.[0])
                                               handleChangeAvatar(e.target.files?.[0])
                                       }}
                                       accept="image/*" type="file"/>

                            </label>
                            <span className="w-10"><FaPhotoVideo/></span>
                        </p></li>

                        <li className="flex"><p className="text-center justify-center flex items-center">

                            <label className="w-32">
                                تغير الغلاف

                                <input
                                    onChange={(e) => {
                                        if (e.target.files?.[0])
                                            handleChangeCover(e.target.files?.[0])
                                    }}
                                    hidden accept="image/*" type="file"/>

                            </label>
                            <span className="w-10"><MdPhotoSizeSelectActual/></span>
                        </p></li>
                    </ul>
                </div>
                <div
                    className="w-full max-sm:w-full max-sm:m-0 rounded bg-base-100 mr-3 p-5 flex justify-center  h-full flex-col">

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">تغير اسم المستخدم </span>
                        </label>
                        <div className="flex items-center">
                            <input type="text" defaultValue={user.username}
                                      onChange={(e) => {
                                            setUsername(e.target.value)
                                      }}
                                   className="input bg-base-200 input-bordered w-full max-w-xs"/>
                        </div>

                        <label className="label">
                            <span className="label-text">نبذة شخصية</span>
                        </label>
                        <div className="flex items-center">
                            <textarea placeholder="اكتب نبذه شخصية عن نفسك"
                                      onChange={(e) => {
                                            setBio(e.target.value)
                                      }}
                                      defaultValue={user.bio}
                                      className="p-2 px-3 input bg-base-200 input-bordered h-14 w-full">
                            </textarea>
                        </div>


                        <label className="label">
                            <span className="label-text">البريد الالكتروني </span>
                        </label>
                        <div className="flex items-center">
                            <input type="email" defaultValue={user.email}
                                   dir="ltr"
                                   onChange={(e) => {
                                       setEmail(e.target.value)
                                   }}
                                   className="input bg-base-200 text-right input-bordered w-full"/>
                        </div>


                    </div>
                </div>

            </div>


            <div className="w-full bg-base-300 p-3 space-y-3 rounded">

                <div>
                    <div className="flex flex-col w-full bg-base-100 p-2 rounded">
                        <div className="form-control w-fit">
                            <label className="cursor-pointer label">
                                <input onChange={(e) => {
                                    setNotifications(e.target.checked)
                                }} type="checkbox" className="toggle toggle-lg toggle-primary" defaultChecked={user.allow_notifications}/>
                                <span className="label-text mr-3">تشغيل الاشعارات</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col w-full bg-base-100 p-2 rounded">
                        <div className="form-control w-fit">
                            <label className="cursor-pointer label">
                                <input type="checkbox" onChange={() => {
                                    setNotificationsSound(!notificationsSound)
                                }} disabled={!notifications} checked={(notifications && notificationsSound)}
                                       className="toggle toggle-lg toggle-primary"/>
                                <span className="label-text mr-3">تشغيل صوت الاشعارات</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col w-full bg-base-100 p-2 rounded">
                        <div className="form-control w-fit">
                            <label className="cursor-pointer label">
                                <input onChange={(e) => {
                                    setAllowMessages(e.target.checked)
                                }} type="checkbox" className="toggle toggle-lg toggle-primary" defaultChecked={user.allow_messages}/>
                                <span className="label-text mr-3">استقبال الرسائل ( من المستخدمين)</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full p-2 bg-base-100">
                    <button
                        onClick={handleChangeInfo}
                        className="btn btn-block">حفظ الاعدادات</button>

                </div>

            </div>

        </div>
    )
}

export default MyAccountPage
