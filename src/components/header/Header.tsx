import React, {useEffect, useState} from "react";
import "./Header.scss"
import {Link, NavLink} from "react-router-dom";
import NotificationBtnComponent from "./NotificationBtn.component";
import SearchBtnComponent from "./SearchBtn.component";
import {
    AiFillHome,
    AiFillWechat,
    BiUser, FaBook,
    IoIosColorPalette,
    MdLogout, MdOutlineContactSupport,
    MdOutlineFavoriteBorder
} from "react-icons/all";
import soloLeveling from "../../assets/images/solo-leveling_.png";
import {useAppSelector} from "../../hooks/redux";
import store from "../../store";
import {addToast, removeToast} from "../../reducers/toast/toast.reducer";
import {motion} from "framer-motion";
import {getUserThunk} from "../../reducers/auth/actions/auth.actions";
import {Logo} from "../logo";

const themes = {
    light: {
        ar: "فاتح",
    },
    lofi: {
        ar: "متوسط",
    },
    dark: {
        ar: "مظلم",
    },
    halloween: {
        ar: "اسجارد",
    },
    business: {
        ar: "أعمال",
    },
    acid: {
        ar: "حمضي",
    },
    lemonade: {
        ar: "ليموني",
    }
}

export default function Header() {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const {user, isLogin, isLoading} = useAppSelector(((state) => state.auth));
    useEffect(() => {
        const theme = localStorage.getItem("theme") as string;
        setTheme(theme);
    }, [])


    function setTheme(theme: string) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }


    useEffect(() => {

        store.dispatch(getUserThunk());
        const isCookiesAccepted = localStorage.getItem("cookies-accepted");
        if (!isCookiesAccepted) {
            store.dispatch(addToast({
                type: "info",
                title: "ما هي الكوكيز؟",
                message: "هي ملفات صغيرة تحتوي على معلومات تساعدنا على تحسين تجربتك على موقعنا. يمكنك تعطيلها في أي وقت من خلال تغيير إعدادات متصفحك. لمزيد من المعلومات، يرجى قراءة سياسة الخصوصية لدينا.",
                btnCallback: (toast) => {
                    localStorage.setItem("cookies-accepted", "true");
                    store.dispatch(removeToast((toast.id) as number))
                },
                btnText: "موافق",
            }))
        }
    }, []);

    return (
        <>
            <div className="sticky z-50 bg-base-300" dir="rtl">
                <div className="navbar ">
                    <div className="navbar-start">


                        <label htmlFor="sidebar" onClick={() => {
                            setIsSideBarOpen(!isSideBarOpen)
                        }} tabIndex={0} className="btn btn-ghost w-12 mr-3">

                            <svg className="hidden max-md:block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h7"/>
                            </svg>

                            <div className="max-md:hidden " dir="ltr">
                                <Logo isFull={false}/>
                            </div>


                        </label>

                    </div>
                    <div className="navbar-center">
                        <div className="flex max-md:hidden space-x-5 text-xl" dir="ltr">



                            <NavLink to="/contact-us"  className={({isActive}) => {
                                return "btn text-lg hover:btn-primary peer flex justify-center " + (isActive ? "btn-primary active" : "")
                            }}>


                                <span className="mr-2">تواصل معنا</span>


                                <span className="text-bold ">

                                <MdOutlineContactSupport/>

                            </span>

                            </NavLink>



                            <NavLink to="/manga" className={({isActive}) => {
                                return "btn text-lg  hover:btn-primary  flex justify-center " + (isActive ? "btn-primary" : "")
                            }}>

                                <span className="mr-2">المانجا</span>

                                <span className="text-bold">
                                <FaBook/>
                            </span>

                            </NavLink>


                            <NavLink to="/" className={({isActive}) => {
                                return "btn text-lg hover:btn-primary  flex justify-center " + (isActive ? "btn-primary" : "")
                            }}>

                                <span className="mr-2">الرئيسية</span>

                                <span className="text-bold">

                                <AiFillHome/>

                            </span>
                            </NavLink>


                        </div>

                    </div>
                    <motion.div
                        key={"isLogin" + isLogin}
                        transition={{duration: 0.5}}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="navbar-end">

                        <SearchBtnComponent/>
                        <NotificationBtnComponent/>


                        <div className="dropdown" dir="ltr">
                            <label tabIndex={0} className="btn    h-14 px-3 rounded-lg" dir="ltr">
                                <div className="avatar w-10 ">
                                    <div className="rounded-lg">
                                        <img src={user?.avatar_url ||soloLeveling} className="object-cover" alt="image"/>
                                    </div>
                                </div>
                                {
                                    user && <h1 className="text-lg ml-3 max-sm:hidden">{user.username}</h1>
                                }
                            </label>
                            <ul tabIndex={0}
                                className=" mt-3 shadow menu menu-compact dropdown-content rounded-md w-64 space-y-1 bg-transparent"
                                dir="rtl">

                                <div>
                                    <div className="space-x-2 flex justify-center w-full bg-base-200 p-2 rounded-lg"
                                         dir="ltr">
                                        <label htmlFor="theme-modal" className="btn text-xl">
                                            <span><IoIosColorPalette/></span>
                                        </label>
                                        <button disabled={!isLogin} className="btn text-xl">
                                            <NavLink to="/account"><BiUser/></NavLink>
                                        </button>

                                    </div>
                                </div>


                                {isLoading ? <LoadingLoginComponent/> : (isLogin) ? <LoginComponent/> :
                                    <NotLoginComponent/>}

                            </ul>
                        </div>
                    </motion.div>
                </div>


            </div>
            <div>

            </div>


            <input type="checkbox" id="theme-modal" className="modal-toggle"/>
            <label htmlFor="theme-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="" dir="rtl">
                    <h3 className="text-lg font-bold">اختيار المظهر</h3>
                    <div className="flex justify-center p-3 flex-wrap w-full overflow-x-hidden">
                        {
                            Object.keys(themes).map((theme, index) => {
                                return (
                                    <button key={index} onClick={() => {
                                        setTheme(theme)
                                    }}
                                            className="btn btn-primary m-2"> {themes[theme as keyof typeof themes].ar} </button>
                                )
                            })

                        }

                    </div>

                </label>
            </label>


        </>

    );
}

const LoginComponent = () => {
    return (
        <>
            <div>
                <div className="space-x-2 flex justify-center w-full bg-base-200 p-2 rounded-lg" dir="ltr">
                    <NavLink to="/account/favorites" className="btn text-xl">
                        <span><MdOutlineFavoriteBorder/></span>
                    </NavLink>
                    <NavLink to="/account/chat" className="btn text-xl">
                        <span><AiFillWechat/></span>
                    </NavLink>
                    <NavLink to="/logout" className="btn text-xl btn-outline btn-error">
                        <span><MdLogout/></span>
                    </NavLink>
                </div>
            </div>

        </>
    )
}

const NotLoginComponent = () => {

    useEffect(() => {
        const theme = localStorage.getItem("theme") as string;
        setTheme(theme);
    }, [])


    function setTheme(theme: string) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    return (

        <div className="bg-base-200 rounded-lg p-2">
            <div className="w-full flex space-x-2 justify-center" dir="ltr">
                <Link to={"/auth/register"} className="btn btn-sm  btn-primary">إنشاء حساب</Link>


                <Link to={"/auth/login"} className="btn btn-sm ">تسجيل الدخول</Link>
            </div>
        </div>
    )
}

const LoadingLoginComponent = () => {
    return (
        <div className="ml-3">
            يرجي الانتظار....
        </div>
    )
}
