import React from "react";
import {SwiperSlide} from "swiper/react";
import soloLeveling from "../../../assets/images/solo-leveling_.png";
import "./sliderCard.scss";
import {GiBookCover} from "@react-icons/all-files/gi/GiBookCover";
import KoreanFlag from "../../../assets/images/img.png";
import {VscDebugBreakpointData} from "@react-icons/all-files/vsc/VscDebugBreakpointData";
import {Link} from "react-router-dom";
import {IManga} from "../../../interfaces/manga.interface";
import {FaPlay} from "@react-icons/all-files/fa/FaPlay";

export default function SliderCard({manga}:{manga:IManga}) {
    return (
        <>
            <div className="w-full rounded-box overflow-hidden lg:max-w-7xl md:max-w-5xl  h-full p-10 flex justify-center items-center mx-auto ">

                <div className=" rounded-box z-10 w-full sliderCard h-full" style={
                    {
                        "background": "rgba(126, 126, 126, 0.22)",
                        backdropFilter: "blur(32.5px)"
                    }
                }>
                    <div className="h-full p-5 pr-0 w-[13rem]">
                        <img src={manga.cover_url||soloLeveling} className="h-full w-full object-cover rounded-lg shadow-lg drop-shadow-2xl" alt="car!"/>
                    </div>
                    <div className="card-body">
                        <div className="sliderCard--body">
                            <div className="w-full">
                                <h2 className="card-title sliderCard--title text-5xl text-base-content">
                                    {
                                        manga.title.split(" ").map((word, index) => {
                                            return <span className={(index < 1) ? "text-primary" : ""} key={index}>{word} </span>
                                        })
                                    }
                                </h2>


                                <div className="sliderCard--story font-semibold  flex justify-center items-center h-32">
                                    <p className="w-[50ch]  mx-auto line-clamp-5">
                                        {manga.story}
                                    </p>
                                </div>


                            </div>
                            <span className="rounded-full h-full w-4 bg-primary  mx-10">
                            </span>
                            <div className="sliderCard--actions mr-5 ml-3 p-8 justify-center items-center">
                                <div className="flex h-11 justify-center items-center  mb-2">
                                   <div
                                        className="rating h-full min-h-[62px] items-center justify-center px-8 w-52 bg-base-100 rounded-lg">
                                        <input type="radio" name={`top_manga_rate_${manga.id}`} className="mask mask-star-2 bg-orange-400"/>
                                        <input type="radio" name={`top_manga_rate_${manga.id}`} className="mask mask-star-2 bg-orange-400" defaultChecked={true}/>
                                        <input type="radio" name={`top_manga_rate_${manga.id}`} className="mask mask-star-2 bg-orange-400"/>
                                        <input type="radio" name={`top_manga_rate_${manga.id}`} className="mask mask-star-2 bg-orange-400"/>
                                        <input type="radio" name={`top_manga_rate_${manga.id}`} className="mask mask-star-2 bg-orange-400"/>
                                    </div>
                                    <div className="sliderCard--flag min-h-[62px]  w-16 h-full ml-2">
                                        <img className="h-full w-full  rounded-lg" src={KoreanFlag} alt=""/>
                                    </div>
                                </div>

                                <div className="flex w-full justify-center items-center mt-3">
                                    <button className="btn min-h-[62px]  h-full w-16 mr-2 text-3xl text-green-500 rounded-lg">
                                        <VscDebugBreakpointData/>
                                    </button>
                                    <Link to={`/manga/${manga.slug}`} className="btn btn-primary w-52 h-full rounded-lg text-2xl">
                                        <span className="mr-3"><FaPlay/></span>
                                        اقـــــــــــــــرأ

                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
