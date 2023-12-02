import React from "react";
import {SwiperSlide} from "swiper/react";
import soloLeveling from "../../../assets/images/solo-leveling_.png";
import {GiBookCover} from "@react-icons/all-files/gi/GiBookCover";
import KoreanFlag from "../../../assets/images/img.png";
import {VscDebugBreakpointData} from "@react-icons/all-files/vsc/VscDebugBreakpointData";
import {Link} from "react-router-dom";
import {IManga} from "../../../interfaces/manga.interface";
import {FaPlay} from "@react-icons/all-files/fa/FaPlay";
import {Rating} from "../../../components/rating/rating.component";
import {TypeImage} from "../../../components/type-image/type-image.component";
import {getStatusColor} from "../../../utils/manga-helper";

export default function SliderCard({manga, mobile_nav = { count : 3 , active : false , index : 0}}: {
    manga: IManga,
    mobile_nav: { count: number , active: boolean, activeFn?: Function, index: number }
}) {
    console.log(mobile_nav);
    return (
        <div
            className="rounded-box overflow-hidden w-[272px]  lg:w-fit  lg:max-w-6xl  max-w-sm  h-full flex justify-center items-center mx-auto  max-lg:mb-32">

            <div className=" flex justify-center w-full  ">
                <div className="flex  w-full max-w-7xl flex-col lg:flex-row ">


                    <div className="lg:h-full h-[395px]  rounded-xl backdrop-blur-lg lg:w-56 sm:flex-none  shadow-2xl">
                        <img src={manga.cover_url || soloLeveling}
                             className="h-full w-full object-cover rounded-lg rounded-r-md shadow-lg "
                             alt="image"/>
                    </div>


                    <div className="w-full flex flex-row  md:h-80 h-44 mt-1.5">
                        <div
                            className="lg:p-10 w-full  backdrop-blur-lg bg-black/30 mx-1 rounded-md  flex flex-col">
                            <h2 className="font-bold capitalize lg:text-5xl text-lg  md:text-left text-center max-sm:p-2 ">
                                {
                                    manga.title.split(" ").map((word, index) => {
                                        return <span className={(index < 1) ? "text-primary" : ""}
                                                     key={index}>{word} </span>
                                    })
                                }
                            </h2>


                            <div
                                className="font-semibold p-2 mt-0 pt-0 w-full flex justify-center    items-center md:mt-5 ">
                                <p className="mx-auto text-xs md:text-lg line-clamp-5 w-full text-right">
                                    {manga.story}
                                </p>
                            </div>

                            <div className="flex md:hidden p-3 w-full justify-center mt-auto">
                                {
                                    // for mobile
                                    Array.from(Array(Math.min(3, mobile_nav.count)).keys()).map((index) => {
                                        return (
                                            <div key={index} className="flex justify-center items-center">
                                                <button
                                                    onClick={() => mobile_nav?.activeFn && mobile_nav.activeFn(index)}
                                                    className={`rounded-full w-2 h-1.5 mx-1 transform-transition duration-[1500ms] ${
                                                        mobile_nav.active
                                                            ? mobile_nav.index === index
                                                                ? "bg-primary"
                                                                : "bg-base-200"
                                                            : mobile_nav.index === index
                                                                ? "bg-primary !w-7"
                                                                : "bg-base-200"
                                                    }`}
                                                />
                                            </div>
                                        );
                                    })
                                }
                            </div>


                        </div>
                        {
                            // it's a info-menu for mobile
                        }
                        <div
                            className="bg-base-300 p-3 md:hidden  flex justify-center items-center flex-col   rounded-xl rounded-br-3xl  ">
                            <div className="flex h-24 space-x-1.5 ">
                                <Rating disabled={true} manga={manga}
                                        className="rating-sm flex-col  h-full w-8  rounded-r-md space-y-0.5 items-center justify-center py-4  bg-base-100 rounded-lg"/>
                                <div className="space-y-1.5 flex flex-col">
                                    <div
                                        className=" h-8 rounded-lg rounded-l-md rounded-b-md overflow-hidden flex-none w-8">
                                        <TypeImage mangaType={manga.type} largeIcons={true}/>


                                    </div>
                                    <button
                                        className="rounded-b-md rounded-t-md  rounded-l-md flex justify-center items-center  w-8 h-full  rounded-xl bg-base-100">

                                            <span className="h-3 w-3 rounded-full"
                                                  style={{backgroundColor: getStatusColor(manga.status)}}></span>
                                    </button>
                                </div>
                            </div>
                            <Link to={`/manga/${manga.slug}`} className="btn btn-primary w-full rounded-t-sm rounded-lg min-h-8 h-8  mt-1.5  ">
                                <FaPlay className=""/>
                            </Link>

                        </div>


                        <div
                            className="w-44 bg-black/30 backdrop-blur-lg h-full lg:flex justify-center items-center rounded-xl rounded-l-md pl-4 hidden">
                            <div className="flex flex-col -rotate-90">
                                <div className="flex h-11 justify-center items-center  mb-2">
                                    <Rating disabled={true} manga={manga}
                                            className="rating-lg h-full min-h-[62px] rounded-r-md space-x-1 items-center justify-center px-8 w-52 bg-base-100 rounded-lg"/>

                                    <div
                                        className="sliderCard--flag min-h-[62px] rounded-xl rounded-l-md overflow-hidden  w-16 h-full ml-1">
                                        <TypeImage mangaType={manga.type} largeIcons={true}/>


                                    </div>
                                </div>

                                <div className="flex  w-full justify-center items-center mt-3">
                                    <button
                                        className="btn rounded-r-sm min-h-[62px]  h-5 w-16 mr-1 text-3xl text-green-500 rounded-lg">

                                            <span className="h-5 w-5 rounded-full"
                                                  style={{backgroundColor: getStatusColor(manga.status)}}></span>
                                    </button>
                                    <Link to={`/manga/${manga.slug}`}
                                          className="btn btn-sm btn-primary w-52 h-14 rounded-l-sm rounded-lg text-2xl">
                                        <span className="mr-3"><FaPlay/></span>
                                        اقـــــــــــــــرأ

                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
        ;
}
