
import soloLeveling from "../../assets/images/solo-leveling_.png";
import koreanFlag from "../../assets/images/Flag_of_South_Korea.svg.png";
import {VscDebugBreakpointData} from "@react-icons/all-files/vsc/VscDebugBreakpointData";
import React from "react";
import {IManga} from "../../interfaces/manga.interface";
const MangaCollectionCard = ({manga}:{manga : IManga}) => {

    return(
        <div className="flex  bg-base-100 p-2 rounded">
            <figure className="h-20 w-14 flex-none">
                <img className="w-full h-full object-cover rounded" src={manga.cover_url} alt=""/>
            </figure>
            <div className="mx-3  w-full">
                <h2 className="font-semibold text-xl">{manga.title}</h2>
                <div className="rating rating-sm">
                    <input type="radio"  className="mask mask-star-2 bg-orange-400"/>
                    <input type="radio"  className="mask mask-star-2 bg-orange-400" defaultChecked={true}/>
                    <input type="radio"  className="mask mask-star-2 bg-orange-400"/>
                    <input type="radio"  className="mask mask-star-2 bg-orange-400"/>
                    <input type="radio"  className="mask mask-star-2 bg-orange-400"/>
                </div>

                <div className="flex mt-1">
                    <img className="h-6 w-8" src={koreanFlag} alt=""/>
                    <p className="mx-3 bg-base-300 px-2 ">
                      مستمر
                    </p>
                    <span className="h-6 flex justify-center items-center rounded bg-base-300 px-2">
                        <VscDebugBreakpointData className="text-green-400"/>
                    </span>
                </div>
            </div>

        </div>
    )
}

export default MangaCollectionCard
