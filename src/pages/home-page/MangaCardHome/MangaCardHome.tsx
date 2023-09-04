import React from "react";
import "./MangaCardHome.scss";
import FlagKorean from "../../../assets/FL/kr_small.svg";
import {FaBook} from "@react-icons/all-files/fa/FaBook";
import soloLeveling from "../../../assets/images/solo-leveling_.png";
import {IManga} from "../../../interfaces/manga.interface";
import {Link} from "react-router-dom";
export default function MangaCardHome({manga}:{manga:IManga}) {
    console.log("==MANGA===> ",manga)
    return (
        <div className="manga-card bg-base-300  mb-5 mt-5">
            <div className="manga-card--info">
                <Link to={`/manga/${manga.slug}`} className="manga-card--info--title hover:text-primary duration-300">{manga.title} </Link>
                <div className="ml-auto mb-2">
                    <Link to={`/manga/${manga.slug}/${manga.chapters.find((a=>{
                        // get last chapter number 
                        // last chapter is highest number
                        return a.number === Math.max(...manga.chapters.map((a)=>a.number))
                    }))?.number}`} className="btn text-xl btn-sm bg-base-100 w-32 ml-auto h-10 flex justify-center items-center">
                        <span>CH.</span>
                        <span>{manga.chapters[manga.chapters.length - 1]?.number}</span>
                        <span className="mb-1 ml-auto"><FaBook/></span>

                    </Link>
                </div>
                <div className="flex justify-center items-center">

                    <div className="bg-base-100 rounded w-full h-10 justify-flex items-center flex -left-3 pl-0.5 relative">
                        <div className="rating rating-md rounded h-fit mx-auto">
                            <input type="radio" name={`rating-manga-${manga.id}`} className="mask mask-star-2 bg-orange-400" disabled/>
                            <input type="radio" name={`rating-manga-${manga.id}`}  className="mask mask-star-2 bg-orange-400" checked disabled/>
                            <input type="radio" name={`rating-manga-${manga.id}`}  className="mask mask-star-2 bg-orange-400" disabled/>
                            <input type="radio" name={`rating-manga-${manga.id}`}  className="mask mask-star-2 bg-orange-400" disabled/>
                            <input type="radio" name={`rating-manga-${manga.id}`}  className="mask mask-star-2 bg-orange-400" disabled/>
                        </div>
                    </div>
                    <div className="w-10 h-10 flex-none relative -left-1">
                        <img className="w-full h-full  rounded" src={FlagKorean} alt="Korean Flag"/>
                    </div>

                </div>
            </div>

            <div className="h-56 w-40 flex-none relative -top-4 rounded">
                <img className="rounded drop-shadow-xl object-cover border-primary/30  h-full w-full" src={manga.cover_url||soloLeveling}  alt="Manga"/>
            </div>
        </div>
    );
}
