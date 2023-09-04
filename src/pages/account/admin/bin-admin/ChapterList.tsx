import {getArStringFromTime} from "../../../../utils/time.helper";
import React, {useEffect} from "react";
import {IManga, MangaTypesEnum} from "../../../../interfaces/manga.interface";
import {getStatusAr, getTypeAr, getTypeFlag} from "../../../../utils/manga-helper";
import {Link} from "react-router-dom";
import {AiFillDelete, BiShowAlt, MdRestore} from "react-icons/all";
import {IChapter} from "../../../../interfaces/chapter.interface";
import {ShowChapterModal} from "./ShowChapter.modal";
import {confirmDeleteChapter, restoreChapter} from "../../../../services/chapter.service";
import useToaster from "../../../../hooks/toast/useToaster.hook";
import {AxiosResponse} from "axios";
import {IException} from "../../../../interfaces/exception.interface";

export type IChp = IChapter & { manga: IManga };

const ChapterList = ({chapters, handleDelete}: {
    chapters: IChp[],
    handleDelete: (chpId: number) => void
}) => {
    const toaster = useToaster();
    const [chapter, setChapter] = React.useState<IChapter>(chapters[0]);


    const handleRestoreChapter = (chpId: number) => {

        restoreChapter(chpId).then((res: AxiosResponse<IException>) => {
            toaster.createToast({
                message: res.data.message as string,
                type: "success"
            });
            handleDelete(chpId);

        }).catch((err) => {
            toaster.createToast({
                message: err.response?.data.message as string || err.message,
                type: "error"
            });
        })
    }

    const handleDeleteChapter = (chpId: number) => {
        confirmDeleteChapter(chpId).then((res: AxiosResponse<IException>) => {
            toaster.createToast({
                message: res.data.message as string,
                type: "success"
            });
            handleDelete(chpId)
        }).catch((err) => {
            toaster.createToast({
                message: err.response?.data.message as string || err.message,
                type: "error"
            });
        })
    }


    return (
        <>
            <div className="">
                <ul>
                    <li
                        className="w-full bg-base-300 h-20 flex flex-row justify-between items-center ">
                        <div className="w-3/12 flex " dir="rtl">
                            <span className="text-center w-full font-bold">العمل</span>
                        </div>
                        <div className="w-2/12 flex-row justify-center items-center text-center">
                            <span className="font-bold">الفصل</span>
                        </div>
                        <div className="w-2/12 flex flex-row justify-center items-center">
                            <span className="font-bold">النوع</span>
                        </div>
                        <div className="w-1/12 flex flex-row justify-center items-center">
                            <span className="font-bold">الحالة</span>
                        </div>
                        {/* VIEWS */}
                        <div className="w-1/12 flex flex-row justify-center items-center">
                            <span className="font-bold">مشاهدات</span>
                        </div>
                        {/* ID */}
                        <div className="w-3/12 flex flex-row justify-center items-center">
                            التحكم
                        </div>
                    </li>


                    <ShowChapterModal chapter={chapter}/>

                    {chapters.map((m) => (
                        <li className="w-full" key={`${m.id}_${m.number}`}>
                            <div
                                className=" rounded-sm w-full odd:bg-base-300 h-20 flex flex-row justify-between items-center ">
                                <div className="w-3/12 flex" dir="rtl">
                                    <div className=" flex flex-row justify-center items-center">
                                        <img src={m.manga.cover_url} alt="COVER"
                                             className="w-14 h-16 object-cover"/>
                                    </div>
                                    <div className=" flex flex-row  items-center mr-3">
                                        <span className="text-base-content">{m.manga.title}</span>
                                    </div>
                                </div>
                                <div className="w-2/12 text-center">
                                    <span className="text-base-content">{m.manga.chapters.length}</span>
                                </div>
                                <div className="w-2/12 flex flex-row justify-center items-center">
                                    <span className="text-base-content">{getTypeAr(m.manga.type)}</span>
                                </div>
                                <div className="w-1/12 flex flex-row justify-center items-center">
                                    <span className="text-base-content">{getStatusAr(m.manga.status)}</span>
                                </div>
                                {/* VIEWS */}
                                <div className="w-1/12 flex flex-row justify-center items-center">
                                    <span className="text-base-content">{m.views}</span>
                                </div>
                                {/* ID */}
                                <div className="w-3/12 flex flex-row justify-around  items-center">
                                    <span className="text-base-content"></span>
                                    <button className="btn btn-error" onClick={() => {
                                        handleDeleteChapter(m.id);
                                    }}>
                                        <AiFillDelete/>
                                    </button>
                                    <button onClick={() => {
                                        handleRestoreChapter(m.id);
                                    }} className="btn btn-primary">
                                        <MdRestore/>
                                    </button>
                                    <a href={"#show-chapter"} className='btn' onClick={() => {
                                        setChapter(m);
                                    }}>
                                        <BiShowAlt/>
                                    </a>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    );
}
export default ChapterList
