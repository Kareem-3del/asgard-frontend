import {useForm} from "react-hook-form";
import React, {useEffect} from "react";
import {AiFillLock} from "@react-icons/all-files/ai/AiFillLock";
import {loginThunk, registerThunk} from "../../reducers/auth/actions/auth.actions";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {IException} from "../../interfaces/exception.interface";
import {addToast} from "../../reducers/toast/toast.reducer";
import store from "../../store";
import {LoginAlready} from "./login.page";

const RegisterForm = ({onSubmit}: { onSubmit: (e: any) => void }) => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    return (
        <div className="h-[85vh] w-full justify-center items-center flex">
            <div className="w-full max-w-xl  p-5 space-y-5 bg-base-200 rounded-box relative">
                <div className="flex flex-col items-center justify-center h-full z-10">
                    <h1 className="text-3xl font-bold flex">

                        <span className="text-3xl mr-2 mt-1"><AiFillLock/></span>

                        انشاء حساب جديد </h1>
                    <form onSubmit={handleSubmit(onSubmit)}
                          className="flex flex-col items-center justify-center w-full m-5">
                        <div className="w-full space-y-5 mt-5 p-3">
                            <div className="flex flex-col items-center justify-center w-full space-y-2">
                                <input type="text" id="email" placeholder="اسم المستخدم"
                                       className="input input-bordered rounded-box w-full text-center" {...register("username", {required: true})}/>
                                {errors.username && <span className="text-red-500">هذا الحقل مطلوب</span>}
                            </div>

                            <div className="flex flex-col items-center justify-center w-full space-y-2">
                                <input type="text" id="email" placeholder="البريد الالكتروني"
                                       className="input input-bordered rounded-box w-full text-center" {...register("email", {required: true})}/>
                                {errors.email && <span className="text-red-500">هذا الحقل مطلوب</span>}
                            </div>
                            <div className="flex flex-col items-center justify-center w-full space-y-2">
                                <input type="password" id="password"
                                       className="input input-bordered rounded-box w-full text-center"
                                       placeholder="كلمة المرور" {...register("password", {required: true})}/>
                                {errors.password && <span className="text-red-500">هذا الحقل مطلوب</span>}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-wide btn-primary rounded-box mt-10">

                            انشاء حساب جديد

                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};
const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const {isLogin} = useAppSelector(state => state.auth);

    const onSubmit = ({username, email, password}: { username: string, email: string, password: string }): void => {
        if (email && password) {
            const loginFC = dispatch(registerThunk({username, email, password}));
            loginFC.then((res) => {
                if (res.type === "auth/register/rejected") {
                    const payloadError = res.payload as IException
                    const action = addToast({message: payloadError.message as string, type: "error"})
                    store.dispatch(action)
                } else {
                    store.dispatch(addToast({
                        type: "success",
                        title: "تم إنشاء الحساب بنجاح",
                        message: "تم إنشاء الحساب بنجاح",
                        btnText: "موافق",
                    }))
                }
            })
        }
    }
    return (
        <div className="flex flex-col items-center justify-center h-full">
            {
                !isLogin ? <RegisterForm onSubmit={onSubmit}/> : <LoginAlready/>

            }
        </div>
    );

};

export default RegisterPage;
