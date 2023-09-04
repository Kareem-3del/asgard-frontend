import soloLeveling from "../../assets/images/solo-leveling_.png";
import React from "react";
import {MdLocationPin, RxBlendingMode} from "react-icons/all";
import {IoReaderSharp} from "@react-icons/all-files/io5/IoReaderSharp";
import {IManga} from "../../interfaces/manga.interface";
import {VscDebugBreakpointData} from "@react-icons/all-files/vsc/VscDebugBreakpointData";
import {getStatusColor, getTypeFlag} from "../../utils/manga-helper";
import {Link} from "react-router-dom";
const SearchMangaCard = ({manga}:{manga:IManga}) => {
    return (
        <div key={"manga_search_card"+manga.id} className="h-44 2xl:w-80 lg:w-96 bg-base-300  justify-center items-center rounded m-3 group overflow-hidden flex relative w-80">
            <div className="absolute z-10 w-full h-full justify-center items-center flex flex-col duration-500 left-0 group-hover:left-full">
                <h1 className="text-2xl 2xl:text-2xl lg:text-3xl font-semibold text-center">
                    {manga.title}
                </h1>
                <span className="h-0.5 w-[75%] bg-primary mt-2"/>
                <span className="bg-gradient-to-br from-base-300/80 to-base-300 absolute w-full h-full top-0 left-0 -z-40"/>
                <img src={manga.cover_url||soloLeveling} className="w-full h-full absolute top-0 left-0 object-cover -z-50 opacity-60" alt=""/>
            </div>

            <div className="relative  w-full h-full  duration-500 right-full flex  group-hover:right-0 p-3">
                <div  className="w-4/6 h-full mr-3 flex flex-col">
                    <div className="w-full bg-base-200 h-4/6 flex rounded p-1 space-x-1">
                        <div className="h-full w-1/3 bg-base-300 justify-center flex flex-col items-center rounded-none btn">
                            <div className="text-4xl mx-auto">
                                <MdLocationPin/>
                            </div>
                            <div className="h-8 w-12 mt-2">
                                <img className="w-full h-full rounded-sm" src={getTypeFlag(manga.type)} alt="MANGA-TYPE"/>
                            </div>
                        </div>
                        <div className="h-full w-1/3 bg-base-300 justify-center flex flex-col items-center rounded-none btn">
                            <div className="text-4xl mx-auto">
                                <RxBlendingMode/>
                            </div>
                            <div className="h-8 w-12 bg-base-100 mt-2 flex justify-center items-center">
                                <span className="text-2xl">
                                    <VscDebugBreakpointData color={getStatusColor(manga.status)}/>
                                </span>
                            </div>
                        </div>
                        <div className=" h-full w-1/3 bg-base-300 justify-center flex flex-col items-center rounded-none btn">
                            <div className="text-4xl mx-auto">
                                <IoReaderSharp/>
                            </div>
                            <div className="h-8 w-12 mt-2 flex justify-center items-center text-lg font-semibold">
                                    1285
                            </div>
                        </div>
                    </div>
                    <div className="h-2/6 w-full flex justify-center items-center bg-base-200 mt-2">
                        <div className="rating rating-md space-x-1">
                            <input type="radio" name={"manga-card-search-rating"+manga.id} className="mask mask-star-2 bg-orange-400"/>
                            <input type="radio" name={"manga-card-search-rating"+manga.id} className="mask mask-star-2 bg-orange-400" checked/>
                            <input type="radio" name={"manga-card-search-rating"+manga.id} className="mask mask-star-2 bg-orange-400"/>
                            <input type="radio" name={"manga-card-search-rating"+manga.id} className="mask mask-star-2 bg-orange-400"/>
                            <input type="radio" name={"manga-card-search-rating"+manga.id} className="mask mask-star-2 bg-orange-400"/>
                        </div>
                    </div>

                </div>
                <Link to={`/manga/${manga.id}/`} className="w-2/6 h-full">
                    <img src={manga.cover_url||soloLeveling} className="w-full h-full object-cover" alt=""/>
                </Link>
            </div>
        </div>
    )
}

export default SearchMangaCard
