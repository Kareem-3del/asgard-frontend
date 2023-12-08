import React, {useEffect, useState} from "react";
import "./Header.scss"
import {NavLink} from "react-router-dom";
import NotificationBtnComponent from "./NotificationBtn.component";
import SearchBtnComponent from "./SearchBtn.component";
import {MdLogout, MdOutlineContactSupport,} from "react-icons/md";
import {FaUserAlt , FaBook , FaBrush} from "react-icons/fa";
import {FiLogIn} from "react-icons/fi";
import {AiFillHome} from "react-icons/ai";
import soloLeveling from "../../assets/images/solo-leveling_.png";
import {useAppSelector} from "../../hooks/redux";
import store from "../../store";
import {addToast, removeToast} from "../../reducers/toast/toast.reducer";
import {motion} from "framer-motion";
import {getUserThunk} from "../../reducers/auth/actions/auth.actions";
import {Logo} from "../logo";
import { MdFavorite } from "@react-icons/all-files/md/MdFavorite";
import {IUser} from "../../interfaces/user.interface";

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
    const [showHeader, setShowHeader] = useState(false);
    const [offset, setOffset] = useState(0);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [isActive, setIsActive] = useState<"Novel" | "Manga" | "Home">("Home");
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

        const onScroll = (e: any) => {
            const top = e.srcElement?.scrollTop
            if (e.srcElement) {
                setOffset(top)
            }
            if (top < 100) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
        }
        document.getElementsByClassName("drawer-content z-0 flex h-full flex-col")[0] && document.getElementsByClassName("drawer-content z-0 flex h-full flex-col")[0]?.addEventListener("scroll", onScroll);

        return () => {
            document.getElementsByClassName("drawer-content z-0 flex h-full flex-col")[0] && document.getElementsByClassName("drawer-content z-0 flex h-full flex-col")[0]?.removeEventListener("scroll", onScroll);
        }
    }, [])


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
            <motion.div
                className="fixed top-0 z-50 w-full"
                // show header and hide using framer motion animation when showHeader state change
                animate={
                    {
                        opacity: showHeader ? 1 : 0,
                        top: showHeader ? 0 : -100,
                    }

                }
                transition={{duration: 0.5}}
            >
                <div className="sticky z-50 bg-base-300" dir="rtl">
                    <div className="navbar ">
                        <div className="navbar-start">


                            <label htmlFor="sidebar" onClick={() => {
                                setIsSideBarOpen(!isSideBarOpen)
                            }} tabIndex={0} className="btn btn-ghost w-12 mr-3">

                                <svg className="hidden max-md:block h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
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


                                <NavLink to="/novels" className={({isActive}) => {
                                    isActive && setIsActive("Novel");
                                    return "btn text-lg hover:btn-primary peer flex justify-center " + (isActive ? "btn-primary active" : "")
                                }}>


                                    {
                                        isActive === "Novel" && <><span className="mr-2">الروايات</span></>
                                    }
                                    <span className="text-bold "><MdOutlineContactSupport/></span>
                                </NavLink>


                                <NavLink to="/manga" className={({isActive}) => {
                                    isActive && setIsActive("Manga");
                                    return "btn text-lg  hover:btn-primary  flex justify-center " + (isActive ? "btn-primary" : "")
                                }}>

                                    {
                                        isActive === "Manga" && <><span className="mr-2">المانجا</span></>
                                    }
                                    <span className="text-bold "><FaBook/></span>
                                </NavLink>


                                <NavLink to="/" className={({isActive}) => {
                                    isActive && setIsActive("Home");
                                    return "btn text-lg hover:btn-primary flex justify-center " + (isActive ? "btn-primary" : "")
                                }}>

                                    {
                                        isActive === "Home" && <><span className="mr-2">الرئيسية</span></>
                                    }

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

                            <div className="hidden md:block">
                                <SearchBtnComponent/>
                            </div>
                            <NotificationBtnComponent/>


                            <div className="dropdown mr-2" dir="ltr">
                                <label tabIndex={0} className="btn    h-14 px-3 rounded-lg" dir="ltr">
                                    <div className="avatar w-10 ">
                                        <div className="rounded-lg">
                                            <img src={user?.avatar_url || soloLeveling} className="object-cover"
                                                 alt="image"/>
                                        </div>
                                    </div>
                                    {
                                        user && <h1 className="text-lg ml-3 max-sm:hidden">{user.username}</h1>
                                    }
                                </label>
                                <ul tabIndex={0}
                                    className=" mt-3 shadow menu menu-compact dropdown-content rounded-md w-48  space-y-1 bg-transparent"
                                    dir="rtl">

                                    {isLoading ? <LoadingLoginComponent/> : (isLogin && user) ? <LoginComponent user={user}/> :
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


            </motion.div>
            <motion.div
                initial={{opacity: 0}}
                animate={
                    {
                        opacity: showHeader ? 0 : 1,
                        top: showHeader ? -100 : 0,
                    }
                }
                transition={{duration: 0.5}}


                className="absolute right-5 pt-4 justify-center items-center top-5  z-[999]">
                <label htmlFor="sidebar" className="max-md:hidden cursor-pointer" dir="ltr" onClick={() => {
                    setIsSideBarOpen(false)
                }}>
                    <Logo isFull={false}/>
                </label>
            </motion.div>
        </>

    );
}

const LoginComponent = ({user}:{user:IUser}) => {
    return (
        <>
            <div>
                <div className="space-y-2 grid-cols-2  w-full bg-base-200 p-2 rounded-lg" dir="ltr">
                    <div className="flex justify-around items-center">
                        <label htmlFor="theme-modal" className="btn text-xl w-20 rounded-lg">
                            <span><FaBrush/></span>
                        </label>
                        <NavLink to="/logout" className="btn text-xl btn-outline btn-error w-20 rounded-lg">
                            <span><MdLogout/></span>
                        </NavLink>


                    </div>
                    <div className="flex justify-around items-center">
                        <NavLink to="/account" className="btn text-xl w-20 rounded-lg">
                            <span><FaUserAlt/></span>
                        </NavLink>
                        <NavLink to={`/user/${user.id}`} className="btn text-2xl w-20 rounded-lg">
                            <span><MdFavorite/></span>
                        </NavLink>
                    </div>
                </div>
            </div>

        </>
    )
}

const NotLoginComponent = () => {
    return (

        <div>
            <div className="space-x-2 flex justify-center w-full bg-base-200 p-2 rounded-lg" dir="ltr">
                <label htmlFor="theme-modal" className="btn text-xl w-12 h-12">
                    <span><FaBrush/></span>
                </label>
                <NavLink to="/auth/login" className="btn text-2xl w-12 h-12">
                    <span className="rotate-180"><FiLogIn/></span>
                </NavLink>
                <NavLink to="/auth/register" className="btn text-xl w-12 h-12">
                    <span><FaUserAlt/></span>
                </NavLink>
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
