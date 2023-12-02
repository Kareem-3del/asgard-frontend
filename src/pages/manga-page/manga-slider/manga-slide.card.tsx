import soloLeveling from "../../../assets/images/solo-leveling_.png";
import koreanFlag from "../../../assets/images/Flag_of_South_Korea.svg.png";
import React from "react";
import {CgReadme, FaList} from "react-icons/all";
import {IManga} from "../../../interfaces/manga.interface";
import {Rating} from "../../../components/rating/rating.component";
import {TypeImage} from "../../../components/type-image/type-image.component";
import {Link} from "react-router-dom";

const MangaSlideCardV3 = ({manga , className }: { manga: IManga , className? : string }) => {
    return (
        <div className="card h-44 w-72 2xl:w-80 ">
            <div className="flex h-full w-full ">
                <div className={`bg-base-300 ${className} w-7/12  h-full flex flex-col space-y-1 p-1 rounded rounded-l-xl`}>
                    <div className="p-2 h-full justify-center items-center">
                        <Link to={`/manga/${manga.slug}`} className="relative pl-3 h-fit hover:text-primary flex items-center transition-colors title">
                            <span className="h-full w-1  rounded-full  bg-primary absolute left-0"/>
                            <span className="mt-0.5 capitalize text-2xl font-bold line-clamp-2">{manga.title}</span>
                        </Link>

                    </div>
                    <div className="flex-none p-1 w-full">
                        <Link to={`/manga/${manga.slug}`} className="w-full font-bold btn btn-sm mb-1 h-8 rounded-sm rounded-t-md btn-primary">
                            اقــــــــــــــــــــــــــرأ
                            <span className="text-2xl ml-2">
                            <CgReadme/>
                            </span>
                        </Link>
                        <div className="flex justify-center items-center w-full space-x-1">
                            <div className="w-full bg-base-200 rounded-sm rounded-b-md">
                                <Rating disabled={true} className="w-full rating-sm h-8 flex justify-center items-center" manga={manga}/>
                            </div>
                            <div className="w-8 h-8 rounded overflow-hidden flex-none">
                                <TypeImage mangaType={manga.type} largeIcons={true}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-5/12 ml-1 flex-none">
                    <img src={manga.cover_url || soloLeveling} alt="" className="h-full object-cover rounded rounded-r-xl w-full"/>
                </div>
            </div>

        </div>
    )
}

export default MangaSlideCardV3
