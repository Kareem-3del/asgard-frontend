import soloLeveling from "../../assets/images/solo-leveling_.png";
import React from "react";
import {BiSortAZ, FaInfoCircle} from "react-icons/all";
import {IManga} from "../../interfaces/manga.interface";
import {getStatusColor} from "../../utils/manga-helper";
import {Link} from "react-router-dom";
import {Rating} from "../../components/rating/rating.component";
import {TypeImage} from "../../components/type-image/type-image.component";
import "./search-manga.card.scss";
const SearchMangaCard = ({manga}: { manga: IManga }) => {
    return (
        <div key={"manga_search_card" + manga.id}
             className="h-56 md:w-96  shadow-2xl search-card  justify-center items-center rounded-xl m-3 group overflow-hidden flex relative w-96">
            <div className="absolute z-10 w-full h-full justify-center items-center flex flex-col duration-500 left-0 front-card">

                <h1 className="text-2xl line-clamp-2 2xl:text-2xl lg:text-3xl font-semibold text-center capitalize">
                    {manga.title}
                </h1>
                <span className="h-0.5  bg-primary mt-2 w-[55%]"/>
                <div className="mt-2">
                    <Rating className="space-x-1 rating-md" disabled={true} manga={manga}/>
                </div>
                <span
                    className="bg-gradient-to-b from-base-300/80 to-black/90 absolute w-full h-full top-0 left-0 -z-40"/>
                <img src={manga.cover_url || soloLeveling}
                     className="w-full h-full absolute top-0 left-0 object-cover -z-50 opacity-60" alt=""/>



            </div>

            <div className="relative w-full h-full  duration-500  flex  right-0 back-card ">
                <div className="w-2/3 flex bg-black/40 mr-1">
                    <div className="h-full flex flex-col w-full rounded p-6 pr-3 pl-4">
                        <Link to={`/manga/${manga.slug}`} className="text-xl font-extrabold line-clamp-2 text-primary">
                            {manga.title}
                        </Link>
                        <div className="flex justify-center items-center w-full h-full overflow-hidden">
                            <p className="text-center line-clamp-[7]  font-semibold text-xs" dir="rtl">
                                {manga.story}
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <div className="btn-xs w-fit px-2 bg-white/10  rounded justify-center items-center flex font-semibold">
                                <span className="text-[16px]">
                                    <BiSortAZ/>
                                </span>
                            </div>
                           <div className="btn-xs w-fit px-2 bg-white/10  rounded justify-center items-center flex font-semibold transition-colors duration-300 cursor-pointer">
                               {manga.chapters.length}
                               <span className="ml-1">فصل</span>
                           </div>

                        </div>
                    </div>
                        <div className="flex-none w-1 mr-5 mx-2 space-x-2 flex-row rotate-90 flex justify-center  h-full items-center ">
                            <button className="btn btn-xs btn-primary w-24 h-8 text-[1rem] font-bold px-1 flex">
                        <span>
                            <FaInfoCircle className="mr-2 -rotate-90"/>
                        </span>
                                <span className="rotate-180">
                            نبــــــــــذة
                        </span>
                            </button>
                            <button className="w-8 h-8 btn btn-xs bg-base-200">
                                <div className="w-3 h-3 rounded-full" style={{
                                    backgroundColor: getStatusColor(manga.status)
                                }}></div>
                            </button>
                            <button className="btn h-8 w-8  btn-xs  p-0 overflow-hidden bg-transparenti">
                                <TypeImage mangaType={manga.type} largeIcons={true} className="w-8 h-8"/>
                            </button>

                        </div>
                </div>

                <Link to={`/manga/${manga.slug}/`} className="w-1/2  relative overflow-hidden h-full ">
                    <img src={manga.cover_url || soloLeveling} className="w-full h-full object-cover" alt=""/>

                    <div className="w-full absolute bottom-3 flex justify-center center ">
                        <Rating disabled={true} className="bg-base-300 rounded-xl p-2 rating-sm space-x-1" manga={manga}/>
                    </div>

                </Link>
            </div>
        </div>
    )
}

export default SearchMangaCard
