import {MdNoteAdd} from "@react-icons/all-files/md/MdNoteAdd";
import soloLeveling from "../../../../assets/images/solo-leveling_.png"
import React from "react";
import {AiFillDelete} from "@react-icons/all-files/ai/AiFillDelete";
import {AiFillEdit} from "@react-icons/all-files/ai/AiFillEdit";
import {BiShow} from "@react-icons/all-files/bi/BiShow";
import CreateMangaComponent from "./create-manga/create-manga.component";
import useAuth from "../../../../hooks/auth/useAuth.hook";
import MangaSlideCardV3 from "../../../manga-page/manga-slider/manga-slide.card";

const MyLibraryPage = () => {
    const {user} = useAuth()
    return (
        <div className="w-full h-full">


            <div className="flex">
                <div className="w-72 mt-5 p-3 flex-none rounded-sm">


                    <label className="btn btn-outline w-full rounded-full" htmlFor="create-manga">

                        اضافة
                        <span className="mr-2 text-2xl mb-0.5"><MdNoteAdd/></span>

                    </label>
                </div>
            </div>
            <div className=" rounded-box mt-3  p-1 flex w-full">
                <ul className="bg-base-200/80 w-full p-3  space-y-3 h-full overflow-y-scroll" dir="rtl">

                    <div className="flex  flex-wrap">
                        {
                            user && user?.manga_work_in?.map((manga, index) => {
                                return <div className="w-96 h-full m-3" key={`manga_work_${manga.id}`} dir="ltr">
                                                <MangaSlideCardV3 manga={manga}/>
                                         </div>
                            })
                        }
                        {
                            user && user?.manga_work_in?.length === 0 &&
                            <div className="flex justify-center items-center w-full h-full">
                                <span className="text-2xl text-base-400">لا يوجد لديك مانجا</span>
                            </div>
                        }
                    </div>
                </ul>
            </div>

            <input type="checkbox" id="create-manga" className="modal-toggle"/>
            <label htmlFor="create-manga" className="modal cursor-pointer">
                <label className=" relative" htmlFor="">
                    <CreateMangaComponent/>
                </label>
            </label>
        </div>
    );
}

export default MyLibraryPage;
