import React from "react";
import {SwiperSlide} from "swiper/react";
import soloLeveling from "../../../assets/images/solo-leveling_.png";
import "./sliderCard.scss";
import {GiBookCover} from "@react-icons/all-files/gi/GiBookCover";
import KoreanFlag from "../../../assets/images/img.png";
import {VscDebugBreakpointData} from "@react-icons/all-files/vsc/VscDebugBreakpointData";
import {Link} from "react-router-dom";
import {IManga} from "../../../interfaces/manga.interface";

export default function MangaSlideMobile({manga}: { manga: IManga }) {
    return (
        <>
            <div className="w-full  flex justify-center items-center">

                <div className="z-10  relative w-full p-5 glass">
                    <div className=" flex flex-col">
                        <img className="h-96 w-full object-cover rounded-sm" src={manga.cover_url || soloLeveling} alt="car!"/>

                        <div className="z-10">
                            <div className="w-full">
                                <Link to={`/manga/${manga.slug}`} className="card-title text-center  text-2xl text-base-content  line-clamp-1">{manga.title}</Link>


                                <p hidden
                                      className="sliderCard--story">{manga.story}</p>


                            </div>
                            <div className=" flex justify-center items-center">
                                <div className="flex w-full  justify-center items-center h-10 space-x-1" dir="ltr">
                                    <div className="justify-center items-center ">
                                        <div className="bg-base-300  w-12 h-full text-3xl text-green-500 rounded-sm justify-center flex items-center">
                                            <VscDebugBreakpointData/>
                                        </div>
                                    </div>
                                    <div
                                        className="rating h-full items-center justify-center w-full  bg-base-100 rounded-sm">
                                        <input type="radio" name={`top_manga_rate_${manga.id}`}
                                               className="mask mask-star-2 bg-orange-400"/>
                                        <input type="radio" name={`top_manga_rate_${manga.id}`}
                                               className="mask mask-star-2 bg-orange-400" defaultChecked={true}/>
                                        <input type="radio" name={`top_manga_rate_${manga.id}`}
                                               className="mask mask-star-2 bg-orange-400"/>
                                        <input type="radio" name={`top_manga_rate_${manga.id}`}
                                               className="mask mask-star-2 bg-orange-400"/>
                                        <input type="radio" name={`top_manga_rate_${manga.id}`}
                                               className="mask mask-star-2 bg-orange-400"/>
                                    </div>
                                    <div className="w-12 h-full flex-none">
                                        <img className="h-full w-full rounded-sm" src={KoreanFlag} alt=""/>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
