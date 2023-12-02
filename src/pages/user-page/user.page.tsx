import soloLeveling from "../../assets/images/solo-leveling_.png";
import React, {useEffect} from "react";
import {TiMessages} from "@react-icons/all-files/ti/TiMessages";
import {BsDiscord, FaEdit, FaUserEdit} from "react-icons/all";
import {AiFillInstagram} from "@react-icons/all-files/ai/AiFillInstagram";
import AdsComponent from "../../components/ads/ads.component";
import UserInfoComponent from "./UserInfo.component";
import MangaListComponent from "./MangaList.component";
import {motion} from "framer-motion";
import ads from "../../assets/images/ads.png";
import {getTopMangaViewsAPI} from "../../services/search.service";
import {AxiosError, AxiosResponse} from "axios";
import {IManga} from "../../interfaces/manga.interface";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getUserAPI} from "../../services/users.service";
import {IUser} from "../../interfaces/user.interface";
import useToaster from "../../hooks/toast/useToaster.hook";
import {IException} from "../../interfaces/exception.interface";
import useAuth from "../../hooks/auth/useAuth.hook";

enum tabs {
    "INFO"
    , "LIBRARY"
}


const UserPage = () => {

    const navigate = useNavigate();
    const toaster= useToaster()
    const [userData, setUserData] = React.useState<IUser>();
    const {user} = useAuth();
    // get user id from params
    const {userId} = useParams();
    if (!userId) {
        navigate("/404");
        toaster.createToast({
            message: "هذا المستخدم غير موجود",
            type: "error"
        })
    }
    useEffect(() => {
        if(!userId) return;
        getUserAPI(userId).then((res: AxiosResponse<IUser>) => {
            setUserData(res.data);
        }).catch((err : AxiosError<IException>) => {
            console.log(err.response?.data)
            navigate("/404");

            toaster.createToast({
                message: "هذا المستخدم غير موجود",
                type: "error"
            })
        });
    }, []);


    const [tabActive, setTabActive] = React.useState<tabs>(tabs.LIBRARY);
    const [manga, setManga] = React.useState<any>([]);
    useEffect(() => {
        getTopMangaViewsAPI().then((res: AxiosResponse<IManga[]>) => {
            setManga(res.data);
        });
    }, []);

    return (
        <div className=" h-full w-full" dir="rtl">
            <div className="w-full bg-base-300 h-96 relative z-10">

                <img src={userData?.cover_url} className="w-full h-full absolute -z-50 object-cover" alt=""/>
                <div className="w-full h-full absolute -z-20  bg-gradient-to-t from-base-100 to-base-100/80"></div>

                <div className=" flex w-full h-full container mx-auto">
                    <div className="flex flex-col flex-none justify-center items-center my-auto md:w-fit md:mx-5 w-full ">
                        <div className="flex w-64">
                            <img className="object-cover  w-52 h-52 rounded-l-md  rounded-lg" src={userData?.avatar_url}
                                 alt=""/>
                            <div className=" flex flex-col justify-between  mr-2 h-52">

                                <Link to={userData?.discord_url || "#"}
                                    className="bg-base-300 h-16 rounded-lg p-3 justify-center flex border-primary items-center hover:bg-primary translation duration-300 rounded-r-md">
                                    <span className="text-2xl"><BsDiscord/></span>
                                </Link>
                                <Link to={userData?.instagram_url || "#"}
                                    className="bg-base-300 h-16 rounded-lg p-3 justify-center flex border-primary items-center hover:bg-primary translation duration-300 rounded-r-md">
                                    <span className="text-2xl"><AiFillInstagram/></span>
                                </Link>

                                <div
                                    className="bg-base-300 rounded-lg  h-16 p-3 justify-center flex border-primary items-center hover:bg-primary translation duration-300 rounded-r-md">
                                    <span className="text-2xl"><TiMessages/></span>
                                </div>

                            </div>
                        </div>
                        <div className="w-64  flex justify-start items-start ml-3">
                            <div className="flex w-52 items-center space-x-1  mt-3" dir="ltr">
                                <h1 className="text-3xl font-semibold w-full bg-base-300 flex justify-center items-center h-12 rounded ">{
                                    userData?.username
                                }</h1>
                                {
                                    (user?.id == userData?.id) && <Link to="/account" className="bg-base-300 h-12 rounded-lg p-3 justify-center flex border-primary items-center hover:bg-primary translation duration-300 rounded-r-md">
                                        <span className="text-2xl"><FaUserEdit/></span>
                                    </Link>
                                }

                            </div>
                        </div>
                    </div>

                    <div className="w-52 flex-none mx-10"/>
                </div>
            </div>


            <div
                className="w-full m-2 p-5 container mx-auto rounded flex duration-300 transition-all overflow-hidden mt-0">
                <div className="md:w-9/12 w-full">
                    <div className="btn-group" dir="ltr">
                        <div onClick={() => {
                            setTabActive(tabs.LIBRARY)
                        }} className={`btn ${(tabActive == tabs.LIBRARY) ? "btn-active" : ""}`}>المكتبة
                        </div>
                        {
                            (userData?.manga_work_in?.[0]) && <div onClick={() => {
                                setTabActive(tabs.INFO)
                            }} className={`btn ${(tabActive == tabs.INFO) ? "btn-active" : ""}`}>اعمالي
                            </div>
                        }

                    </div>

                    <div className="md:h-[450px] py-4 mt-3 overflow-hidden md:p-1 bg-base-300 w-full  rounded-lg">
                        <motion.div
                            key={tabActive}
                            initial="initial"

                            animate="in"
                            variants={{
                                initial: {
                                    opacity: 0,
                                    // x: (tabActive === tabs.INFO) ? "-100%" : "100%"
                                },
                                in: {
                                    opacity: 1,
                                    //  x: 0
                                },
                                out: {
                                    opacity: 0,
                                }
                            }}
                            transition={{
                                type: "tween",
                                ease: "linear",
                                duration: 1
                            }}
                        >
                            {tabActive == tabs.INFO && userData?.manga_work_in && <MangaListComponent manga={userData?.manga_work_in}/>}
                            {tabActive == tabs.LIBRARY && <MangaListComponent manga={userData?.manga_favorite}/>}
                        </motion.div>
                    </div>

                </div>
                <div className="w-3/12 bg-base-100  mr-4 flex-col mt-auto rounded-lg overflow-hidden hidden md:flex">
                    <AdsComponent size={"box-lg"} height="450px" width="100%"/>
                </div>


            </div>


            <div className="container mx-auto">
                <AdsComponent size={"wide-sm"} width="100%"/>
                <br/>
            </div>
        </div>

    )
}

export default UserPage
