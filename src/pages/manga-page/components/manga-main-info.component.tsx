import soloLeveling from "../../../assets/images/solo-leveling_.png";
import {Link} from "react-router-dom";
import {IoChatbox} from "@react-icons/all-files/io5/IoChatbox";
import {BsFillBookmarkFill} from "@react-icons/all-files/bs/BsFillBookmarkFill";
import {AiFillDelete, AiFillFileAdd, BsFillBookmarkCheckFill, FiEdit3} from "react-icons/all";
import React, {useEffect, useRef, useState} from "react";
import {IManga, MangaTypesEnum} from "../../../interfaces/manga.interface";
import {getStatusColor} from "../../../utils/manga-helper";
import {ImBook} from "@react-icons/all-files/im/ImBook";
import useAuth from "../../../hooks/auth/useAuth.hook";
import mangaService from "../../../services/manga.service"
import {IException} from "../../../interfaces/exception.interface";
import {AxiosResponse} from "axios";
import useToaster from "../../../hooks/toast/useToaster.hook";
import {Rating} from "../../../components/rating/rating.component";
import {TypeImage} from "../../../components/type-image/type-image.component";

const MangaMainInfoComponent = ({manga, onCommentsBtnClick}: { manga: IManga, onCommentsBtnClick: () => void }) => {

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
            console.log("COMPARE----", item.id, user?.id)
            if (item.id === user?.id) {
                setIisFavorite(true);
            }
        })
    }, [manga, user])




    const [showComments, setShowComments] = React.useState(false);
    const [showFullStory, setShowFullStory] = React.useState(false);
    const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!contentRef.current) return;

        const tempElement = document.createElement("div");

        tempElement.innerHTML = `<h1 class="font-extrabold uppercase   text-3xl line-clamp-3 text-primary-content flex-none">` + manga.title + "</h1>" + "<div class='leading-5 text-md'>" + manga.story + "</div>";
        tempElement.className = contentRef.current.className + " !h-fit w-72";
        tempElement.style.position = "absolute";
        tempElement.style.visibility = "hidden";
        document.body.appendChild(tempElement);
        setContentHeight(tempElement.clientHeight);
        document.body.removeChild(tempElement);
    }, [manga.story , contentRef.current]);
    return (
        <div className="bg-base-300  relative p-5 flex justify-center items-center mt-2 z-0">
            {
                manga.background_url && <div className="absolute w-full h-full z-0">


                    <span className="absolute w-full h-full bg-gradient-to-r from-primary/20 z-50"/>

                    <span className="absolute w-full h-full bg-gradient-to-l from-primary/20 z-50"/>


                    <div className="w-full md:block  h-full bg-cover -z-10  md:blur-sm drop-shadow-lg blur-md  bg-no-repeat  " style={{backgroundImage:`url(${manga.background_url})`}} />

{/*
                <span className=" bg-black w-full h-full absolute bg-gradient-to-tl backdrop-blur-2xl from-secondary/50 to-primary glass top-0">
                        </span>

*/}


                </div>
            }

            <div className="container sm:h-80  p-3  flex z-50  rounded max-sm:flex-col">
                <img className=" h-full w-52 max-sm:w-72 max-sm:h-96 max-sm:mx-auto rounded-lg object-cover "
                     src={manga.cover_url || soloLeveling} alt=""/>


                <div
                    className="space-y-2 sm:w-full  h-full md:flex flex-col max-sm:w-72  sm:mx-5 max-sm:mt-2  hidden mx-auto overflow-hidden">
                    <div className="sm:hidden">
                        {
                            // if genres is more than 5 then show only 5 and add more button to show all

                            manga.genres.length > 5 ? manga.genres.slice(0, 5).map((item, index) => {
                                    return (
                                        <Link key={index} className="btn btn-sm rounded-sm mr-2"
                                              to={`/search?genre=${item.id}`}>{item.name}</Link>
                                    )
                                }) :
                                manga.genres.map((item, index) => {
                                    return (
                                        <Link key={index} className="btn btn-sm rounded-sm mr-2"
                                              to={`/search?genre=${item.id}`}>{item.name}</Link>
                                    )
                                })
                        }
                    </div>


                    <div className="flex h-full w-full items-center ">
                        <h1 className="font-extrabold uppercase text-center max-sm:text-center text-6xl line-clamp-3 text-primary-content max-sm:text-4xl">{manga.title}</h1>
                    </div>


                    <div className="flex  items-center max-sm:mx-auto ">

                        <Rating className="bg-base-100 px-8 py-3  text-xl rounded-xl rounded-r-md mr-1"
                                show_user_rate={true} disabled={false} manga={manga}/>

                        <div
                            className="h-12  bg-base-100 justify-center items-center  rounded-xl rounded-l-md flex w-12 max-sm:h-12 max-sm:w-16 max-sm:text-4xl  text-4xl">

                            <div className="w-5 h-5 rounded-full" style={{
                                backgroundColor: getStatusColor(manga?.status)
                            }}></div>
                        </div>
                    </div>


                    <div className="flex space-x-1 max-sm:mx-auto">
                        <label
                            className="swap btn  btn-primary rounded rounded-l-lg">
                            <input type="checkbox" defaultChecked={isFavorite} onClick={handleFavoriteBtnClick}/>
                            <span className="swap-off fill-current text-xl"><BsFillBookmarkFill/></span>
                            <span className="swap-on fill-current text-xl"><BsFillBookmarkCheckFill/></span>
                        </label>


                        <button className="swap-off btn btn-primary h-full rounded rounded-r-lg"
                                onClick={() => {
                                    onCommentsBtnClick();
                                    setShowComments(!showComments);
                                }
                                }>

                            <span className="text-xl">
                                 {showComments ? <ImBook/> : <IoChatbox/>}
                                </span>

                        </button>


                    </div>
                    <div className="sm:block">
                        {
                            manga.genres.map((item, index) => {
                                return (
                                    <Link key={index} className="btn bg-base-100 btn-sm rounded border-0 mr-1"
                                          to={`/search?category=${item.id}`}>{item.name}</Link>
                                )
                            })
                        }

                    </div>


                </div>


                <div className="flex column h-fit flex-col mx-auto w-72 md:hidden ">
                    <div
                        onClick={() => {
                            setShowFullStory(!showFullStory);
                        }}
                        className={`flex flex-col relative items-center w-full text-right justify-start bg-base-100 mt-1 mb-3 rounded-xl p-4 duration-100 overflow-hidden h-20  `}
                        style={{ height: showFullStory ? `${contentHeight}px` : undefined }}
                        ref={contentRef}
                    >
                        <h1 className="font-extrabold uppercase   text-3xl line-clamp-3 text-primary-content flex-none">{manga.title}</h1>

                        <div className="leading-5 text-md">
                            {manga.story}
                        </div>
                        <span className={`bg-gradient-to-t from-base-300 to-transparent absolute bottom-0 w-full h-14 opacity-0 transition-opacity duration-300 ${!showFullStory && "!opacity-100"}`}>

                        </span>

                    </div>
                    <div className="w-72  flex justify-center">

                        <div className="h-ful w-fulll">

                            <div className="flex  items-center w-full ">

                               <div className="w-3/4">
                                   <Rating className="bg-base-100 h-12 flex justify-center px-7 items-center  text-xl rounded-sm rounded-tl-xl mr-1"
                                           show_user_rate={true} disabled={false} manga={manga}/>
                               </div>

                                <div
                                    className="h-12  bg-base-100 justify-center items-center  rounded-sm  flex w-1/4  text-4xl">

                                    <div className="w-5 h-5 rounded-full" style={{
                                        backgroundColor: getStatusColor(manga?.status)
                                    }}></div>
                                </div>
                            </div>
                            <div className="flex space-x-1 max-sm:mx-auto mt-1">
                                <button className="bg-black  w-1/4 rounded-bl-xl overflow-hidden ">
                                    <TypeImage className="h-12 w-full object-cover" mangaType={manga.type} largeIcons={false}/>
                                </button>
                                <button className="swap-off btn btn-primary h-full rounded-sm w-3/4"
                                        onClick={() => {
                                            onCommentsBtnClick();
                                            setShowComments(!showComments);
                                        }
                                        }>

                                 <span className="text-xl mr-2">
                                 {showComments ? <ImBook/> : <IoChatbox/>}
                                </span>

                                    {!showComments ? "التعليقات" : "الفصول"}


                                </button>
                            </div>

                        </div>
                        <div className=" ml-1 ">
                            <label
                                className="swap btn h-full btn-primary rounded-sm rounded-r-xl">
                                <input type="checkbox" defaultChecked={isFavorite} onClick={handleFavoriteBtnClick}/>
                                <span className="swap-off fill-current text-xl"><BsFillBookmarkFill/></span>
                                <span className="swap-on fill-current text-xl"><BsFillBookmarkCheckFill/></span>
                            </label>
                        </div>
                    </div>
                    <div className="mt-2 justify-center flex flex-wrap">
                        {
                            // if genres is more than 5 then show only 5 and add more button to show all

                            manga.genres.length > 5 ? manga.genres.slice(0, 5).map((item, index) => {
                                    return (
                                        <Link key={index} className="btn btn-sm rounded-full mr-2"
                                              to={`/search?genre=${item.id}`}>{item.name}</Link>
                                    )
                                }) :
                                manga.genres.map((item, index) => {
                                    return (
                                        <Link key={index} className="btn btn-outline  text-neutral-content btn-sm rounded-lg px-5 m-0.5"
                                              to={`/search?genre=${item.id}`}>{item.name}</Link>
                                    )
                                })

                        }

                    </div>


                </div>


                { user && <div className="flex sm:flex-col ml-auto sm:w-fit  sm:space-y-3 max-sm:space-x-3 max-sm:mt-5 h-full justify-center items-center w-full ">
                    <label htmlFor="edit-manga" className="btn  rounded-lg">
                        {/*
                        تعديل العمل
*/}
                        <span className="text-xl">
                                <FiEdit3/>
                            </span>
                    </label>
                    <label htmlFor={manga.type == MangaTypesEnum.Novel ? "write-novel-chapter" : "upload-chapter"} className="btn rounded-lg ">
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
                }
            </div>
        </div>
    )

}

export default MangaMainInfoComponent
