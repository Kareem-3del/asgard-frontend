import soloLeveling from "../../assets/images/solo-leveling_.png";
import koreanFlag from "../../assets/images/Flag_of_South_Korea.svg.png";
import {VscDebugBreakpointData} from "@react-icons/all-files/vsc/VscDebugBreakpointData";
import React from "react";
import {IManga} from "../../interfaces/manga.interface";
import {Rating} from "../rating/rating.component";
import {TypeImage} from "../type-image/type-image.component";
import {Link} from "react-router-dom";

const MangaCollectionCard = ({manga, type}: { manga: IManga, type?: "mid" | "end" | "start" }) => {

    return (
        <div className="flex h-24 justify-center items-center w-full">
            <Link to={`/manga/${manga.slug}`} className=" h-24 w-[4.5rem] flex-none mr-1">
                <img className="w-full h-full object-cover rounded-lg" src={manga.cover_url} alt=""/>
            </Link>

            <div className={`flex w-full bg-base-100 p-2 rounded-xl rounded-l-sm  ${(type === "start") ? "rounded-b-sm" : ""}  ${(type === "mid") ? "rounded-t-sm rounded-b-sm" : ""}  ${(type === "end") ? "rounded-t-sm" : ""}`}><div className="mx-2 w-full flex flex-col justify-center h-20 ">
                    <Link to={`/manga/${manga.slug}`} className="font-semibold text-xl mb-1 capitalize hover:text-primary">{manga.title}</Link>
                    <div className="flex space-x-1">
                        <Rating disabled={true} manga={manga}
                                className="bg-base-300 rating-sm h-8 px-4 justify-center items-center rounded-lg rounded-r-sm"/>
                        <TypeImage mangaType={manga.type} largeIcons={true} className="h-8 w-8 rounded-lg rounded-l-sm"/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MangaCollectionCard
