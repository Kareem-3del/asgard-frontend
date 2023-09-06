import soloLeveling from "../../../assets/images/solo-leveling_.png";
import {Link} from "react-router-dom";
import {IoChatbox} from "@react-icons/all-files/io5/IoChatbox";
import {BsFillBookmarkFill} from "@react-icons/all-files/bs/BsFillBookmarkFill";
import {AiFillDelete, AiFillFileAdd, BsFillBookmarkCheckFill, FiEdit3} from "react-icons/all";
import React, {useEffect} from "react";
import {IManga} from "../../../interfaces/manga.interface";
import {getStatusColor} from "../../../utils/manga-helper";
import {ImBook} from "@react-icons/all-files/im/ImBook";
import useAuth from "../../../hooks/auth/useAuth.hook";
import mangaService from "../../../services/manga.service"
import {IException} from "../../../interfaces/exception.interface";
import {AxiosResponse} from "axios";
import useToaster from "../../../hooks/toast/useToaster.hook";
import {Rating} from "../../../components/rating/rating.component";
const MangaMainInfoComponent = ({manga , onCommentsBtnClick}: { manga: IManga , onCommentsBtnClick : ()=>void }) => {

    const toaster = useToaster();
    const {user} = useAuth();
    const [isFavorite, setIisFavorite] = React.useState(
        manga.users_favorites.some((item) => {
            return item.id === user?.id;
        }) || false
    );

    function addToFavorites() {
        mangaService.addMangaToFavoriteAPI(manga.id).then((response: AxiosResponse) => {
            setIisFavorite(true);
            toaster.createToast({
                message: response.data.message || "تمت الاضافة بنجاح",
                type: "success"
            })

        }).catch((error: AxiosResponse<IException>) => {
            toaster.createToast({
                message: error?.data.message as string || "حدث خطأ ما",
                type: "error"
            })
        })
    }

    function removeFromFavorites() {
        mangaService.removeMangaFromFavoriteAPI(manga.id).then((response: AxiosResponse) => {
            setIisFavorite(false);
            toaster.createToast({
                message: response.data.message || "تم حذف العمل من المفضلة بنجاح",
                type: "info"
            })

        }).catch((error: AxiosResponse<IException>) => {
            toaster.createToast({
                message: error?.data.message as string || "حدث خطأ ما",
                type: "error"
            })
        })
    }

    function handleFavoriteBtnClick() {
        if (isFavorite) {
            removeFromFavorites();
        } else {
            addToFavorites();
        }
    }
    useEffect(() => {
        manga.users_favorites.forEach((item) => {
            console.log("COMPARE----",item.id, user?.id)
            if (item.id === user?.id) {
                setIisFavorite(true);
            }
        })
    },[manga,user])


    const [showComments, setShowComments] = React.useState(false);


    return (
        <div className="bg-base-300  relative p-5 flex justify-center items-center mt-2 z-0">
            {
                manga.background_url && <div className="absolute w-full h-full z-0">


                    <span className="absolute w-full h-full bg-gradient-to-r from-primary/20 z-50"/>

                    <span className="absolute w-full h-full bg-gradient-to-l from-primary/20 z-50"/>

                    <img className="w-full h-full object-cover -z-10" src={manga.background_url} alt=""/>


                </div>
            }
            <div className="container sm:h-80  p-3  flex z-50  rounded max-sm:flex-col">
                <img className=" h-full w-52 max-sm:w-72 max-sm:h-96 max-sm:mx-auto rounded object-cover " src={manga.cover_url || soloLeveling} alt=""/>
                <div className="space-y-3 sm:w-full  h-full flex flex-col max-sm:w-72  sm:mx-5 max-sm:mt-2   mx-auto overflow-hidden">
                    <div className="sm:hidden">
                        {
                            manga.genres.map((item, index) => {
                                return (
                                    <Link key={index} className="btn btn-sm rounded-sm mr-2"
                                          to={`/search?category=${item.id}`}>{item.name}</Link>
                                )
                            })
                        }
                    </div>


                    <div className="flex h-full w-full items-center ">

                        <h1 className="font-extrabold uppercase text-center max-sm:text-center text-6xl line-clamp-3 text-primary-content max-sm:text-4xl">{manga.title}</h1>
                    </div>

                    <div className="mt-10 hidden sm:block" style={{marginTop: "auto"}}>
                        {
                            manga.genres.map((item, index) => {
                                return (
                                    <Link key={index} className="btn btn-sm rounded-sm mr-2"
                                          to={`/search?category=${item.id}`}>{item.name}</Link>
                                )
                            })
                        }
                    </div>
                    <div className="flex  items-center max-sm:mx-auto ">

                       <Rating className="bg-base-100 px-8 py-3 sm:rating-md text-xl rounded-lg mr-2" show_user_rate={true}  disabled={false} manga={manga} />

                        <div
                            className="h-12  bg-base-100 justify-center items-center  flex w-12 max-sm:h-12 max-sm:w-16 max-sm:text-4xl  text-4xl rounded-sm">

                            <div className="w-5 h-5 rounded-full" style={{
                                backgroundColor: getStatusColor(manga?.status)
                            }}></div>
                        </div>
                    </div>
                    <div className="flex space-x-2 max-sm:mx-auto">


                        <label className=" btn btn-sm btn-primary min-h-[48px] sm:h-12 w-13 text-xl max-sm:text-xl rounded-sm swap max-sm:w-16">
                            <input type="checkbox" defaultChecked={isFavorite} onClick={handleFavoriteBtnClick    }/>
                            <span className="swap-off fill-current"><BsFillBookmarkFill/></span>
                            <span className="swap-on fill-current "><BsFillBookmarkCheckFill/></span>
                        </label>


                        <button className="swap-off  min-h-[48px] sm:w-[11.5rem] btn btn-primary sm:h-12 text-lg rounded-sm max-sm:text-xl max-sm:w-[11.5rem]"  onClick={()=>{
                            onCommentsBtnClick();
                            setShowComments(!showComments);
                        }
                        }>
                            {
                                showComments ? "الفصول" : "التعليقات"
                            }
                            {
                                showComments ? <span className="ml-2"><ImBook/></span> : <span className="ml-2"><IoChatbox/></span>
                            }
                        </button>





                    </div>


                </div>
                <div className="flex sm:flex-col ml-auto sm:w-fit  sm:space-y-3 max-sm:space-x-3 max-sm:mt-5 h-full justify-center items-center w-full ">
                    <label htmlFor="edit-manga" className="btn  rounded-lg">
{/*
                        تعديل العمل
*/}
                        <span className="text-xl">
                                <FiEdit3/>
                            </span>
                    </label>
                    <label htmlFor="upload-chapter" className="btn rounded-lg ">
{/*
                        اضافة فصل
*/}
                        <span className="text-xl">
                                <AiFillFileAdd/>
                            </span>
                    </label>
                    <label htmlFor="delete-manga" className="btn rounded-lg ">
{/*
                        حذف العمل
*/}
                        <span className="text-xl">
                                <AiFillDelete/>
                            </span>
                    </label>

                </div>
            </div>
        </div>
    )

}

export default MangaMainInfoComponent
