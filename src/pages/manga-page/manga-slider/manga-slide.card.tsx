import soloLeveling from "../../../assets/images/solo-leveling_.png";
import koreanFlag from "../../../assets/images/Flag_of_South_Korea.svg.png";
import React from "react";
import {CgReadme, FaList} from "react-icons/all";
import {IManga} from "../../../interfaces/manga.interface";
import {Rating} from "../../../components/rating/rating.component";
import {TypeImage} from "../../../components/type-image/type-image.component";
import {Link} from "react-router-dom";

const MangaSlideCardV3 = ({manga}: { manga: IManga }) => {
    return (
        <div className="card bg-base-300 overflow-hidden h-52 w-full rounded-lg">
            <div className="flex h-full rounded-box">
                <div className="bg-base-300 h-full flex flex-col space-y-2 w-full p-3 pr-0">
                    <div className="p-2 h-full justify-center items-center">
                        <Link to={`/manga/${manga.slug}`} className="hover:text-primary transition-colors title text-2xl font-bold line-clamp-2 border-primary border-l-4 pl-2 capitalize">
                            {manga.title}
                        </Link>

                    </div>
                    <div className="flex-none">
                        <Link to={`/manga/${manga.slug}`} className="w-full font-bold btn mb-2 h-10 btn-primary">
                            اقــــــــــــــــــــــــــرأ
                            <span className="text-2xl ml-2">
                            <CgReadme/>
                            </span>
                        </Link>
                        <div className="flex justify-center items-center w-full space-x-2">
                            <div className="w-full bg-base-200 rounded">
                                <Rating disabled={true} className="w-full h-10 flex justify-center items-center" manga={manga}/>
                            </div>
                            <div className="w-10 h-10 rounded overflow-hidden flex-none">
                                <TypeImage mangaType={manga.type} largeIcons={true}/>
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
