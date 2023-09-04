import soloLeveling from "../../../../assets/images/solo-leveling_.png";
import React from "react";
import {MdEmail} from "@react-icons/all-files/md/MdEmail";
import {RiLockPasswordFill} from "react-icons/all";
import useAuth from "../../../../hooks/auth/useAuth.hook";

const MyAccountPage = () => {
    const {user} = useAuth();
    return (
        user && <div className="mx-auto w-full space-y-3 mb-3 my-2">

            <div className="flex max-sm:flex-col bg-base-300 rounded justify-center items-center p-3">
                <div className="flex-none max-sm:w-full max-sm:mb-3 rounded bg-base-200 w-72 flex flex-col items-center   space-y-2">
                    <div className="avatar  mt-auto pt-4">
                        <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img alt="solo-leveling" src={user.avatar_url || soloLeveling}/>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-semibold  w-60 flex justify-center items-center">
                            <span className="text-primary">{user.username}</span>
                        </h1>
                        <h2 className="text-sm">الحالة : <span className="text-accent">{user.role_name || "مستخدم"}</span></h2>
                    </div>
                    <ul className="menu bg-base-100 w-full">
                        <li className="flex"><p className="text-center justify-center flex items-center">

                            <span className="w-32">تغير كلمة المرور</span>
                            <span className="w-10"><RiLockPasswordFill/></span>


                        </p></li>
                        <li className="flex"><p className="text-center justify-center flex items-center">

                            <span className="w-32">تغير البريد الاكتروني</span>
                            <span className="w-10"><MdEmail/></span>


                        </p></li>
                    </ul>
                </div>
                <div className="w-full max-sm:w-full max-sm:m-0 rounded bg-base-100 mr-3 p-5 flex justify-center  h-full flex-col">

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">تغير اسم المستخدم</span>
                        </label>
                        <div className="flex items-center">
                            <input type="text" className="input bg-base-200 input-bordered w-full max-w-xs"/>
                            <button className="btn btn-primary  mr-2">حفظ</button>
                        </div>

                        <label className="label mt-5">
                            <span className="label-text">نبذة شخصية</span>
                        </label>
                        <div className="flex items-center">
                            <input type="text" className="input bg-base-200 input-bordered w-full"/>
                            <button className="btn btn-primary  mr-2">حفظ</button>
                        </div>


                    </div>
                </div>

            </div>


          <div className="w-full bg-base-300 p-3 space-y-3 rounded">
              <div>
                  <div className="flex flex-col w-full bg-base-100 p-2 rounded">
                      <div className="form-control w-fit">
                          <label className="cursor-pointer label">
                              <input type="checkbox" className="toggle toggle-lg toggle-primary"/>
                              <span className="label-text mr-3">تشغيل صوت الاشعارات</span>
                          </label>
                      </div>
                  </div>
              </div>

          </div>

        </div>
    )
}

export default MyAccountPage
