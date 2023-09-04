import soloLeveling from "../../../assets/images/solo-leveling_.png";
import koreanFlag from "../../../assets/images/Flag_of_South_Korea.svg.png";
import React from "react";
import {FaList} from "react-icons/all";
import {IManga} from "../../../interfaces/manga.interface";

const MangaSlideCardV3 = ({manga}: { manga: IManga }) => {
    return (
        <div className="card bg-base-300 overflow-hidden h-52 w-full rounded-lg">
            <div className="flex h-full rounded-box">
                <div className="bg-base-300 h-full flex flex-col space-y-2 w-full p-3 pr-0">
                    <div className="p-2 h-full">
                        <h1 className="title text-2xl font-bold line-clamp-2 ">{manga.title}</h1>

                    </div>
                    <div className="flex-none">
                        <div className="flex h-10">

                            <button className="w-28 relative h-full bg-black">
                                <img src={koreanFlag} className="w-full h-full absolute rounded top-0 left-0" alt=""/>
                            </button>
                            <button className="flex w-full justify-center items-center bg-primary ml-2 rounded">
                                <span className="mb-1 mr-1"><FaList/></span>
                                <span>{manga.chapters[manga.chapters.length]?.number || 0}</span>
                            </button>
                        </div>
                        <div className="bg-base-200 mt-2 justify-center items-center flex py-2.5 rounded">
                            <div className="rating">
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"
                                       disabled/>
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled
                                       checked/>
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"
                                       disabled/>
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"
                                       disabled/>
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"
                                       disabled/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-36  flex-none p-3 bg-base-300">
                    <img src={manga.cover_url || soloLeveling} alt="" className="h-full object-cover rounded w-full"/>
                </div>
            </div>

        </div>
    )
}

export default MangaSlideCardV3
