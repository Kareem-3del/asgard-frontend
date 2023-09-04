import {getArStringFromTime} from "../../../../utils/time.helper";
import React from "react";
import {IManga, MangaTypesEnum} from "../../../../interfaces/manga.interface";
import {getStatusAr, getTypeAr, getTypeFlag} from "../../../../utils/manga-helper";
import {Link} from "react-router-dom";

interface IGenresListProps {
    manga: IManga[],
}

const MangaList = ({manga}: IGenresListProps) => {
    return (
        <div className="w-full h-full p-2">
            <ul>
                <li
                    className="w-full bg-base-300 h-20 flex flex-row justify-between items-center ">
                    <div className="w-5/12 flex " dir="rtl">
                        <span className="text-center w-full font-bold">العمل</span>
                    </div>
                    <div className="w-2/12 flex flex-row justify-center items-center">
                        <span className="font-bold">النوع</span>
                    </div>
                    <div className="w-2/12 flex flex-row justify-center items-center">
                        <span className="font-bold">الحالة</span>
                    </div>
                    {/* VIEWS */}
                    <div className="w-1/12 flex flex-row justify-center items-center">
                        <span className="font-bold">مشاهدات</span>
                    </div>
                    {/* ID */}
                    <div className="w-1/12 flex flex-row justify-center items-center">
                        <span className="font-bold">ID</span>
                    </div>
                </li>
                {manga.map((m, i) => (
                    <li className="w-full" key={i}>
                        <Link to={`/manga/${m.id}`} className="btn  rounded-sm w-full odd:bg-base-300 h-20 flex flex-row justify-between items-center ">
                            <div className="w-5/12 flex" dir="rtl">
                                <div className=" flex flex-row justify-center items-center">
                                    <img src={m.cover_url} alt=""
                                         className="w-14 h-16 object-cover"/>
                                </div>
                                <div className=" flex flex-row  items-center mr-3">
                                    <span className="text-base-content">{m.title}</span>
                                </div>
                            </div>
                            <div className="w-2/12 flex flex-row justify-center items-center">
                                <span className="text-base-content">{getTypeAr(m.type)}</span>
                            </div>
                            <div className="w-2/12 flex flex-row justify-center items-center">
                                <span className="text-base-content">{getStatusAr(m.status)}</span>
                            </div>
                            {/* VIEWS */}
                            <div className="w-1/12 flex flex-row justify-center items-center">
                                <span className="text-base-content">{m.views}</span>
                            </div>
                            {/* ID */}
                            <div className="w-1/12 flex flex-row justify-center items-center">
                                <span className="text-base-content">{m.id}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

    );
}
export default MangaList
