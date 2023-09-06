import React from "react";
import "./MangaCardHome.scss";
import FlagKorean from "../../../assets/FL/kr_small.svg";
import soloLeveling from "../../../assets/images/solo-leveling_.png";
import {IManga} from "../../../interfaces/manga.interface";
import {Link} from "react-router-dom";
import {Rating} from "../../../components/rating/rating.component";
import {FaClock} from "react-icons/all";
import dayjs from "dayjs";

export default function MangaCardHome({manga}: { manga: IManga }) {
    dayjs.locale('ar')
    function formatDuration(durationInMilliseconds:number) {
        const millisecondsInSecond = 1000;
        const millisecondsInMinute = 60 * millisecondsInSecond;
        const millisecondsInHour = 60 * millisecondsInMinute;
        const millisecondsInDay = 24 * millisecondsInHour;
        const millisecondsInMonth = 30 * millisecondsInDay;

        if (durationInMilliseconds >= millisecondsInMonth) {
            const months = Math.floor(durationInMilliseconds / millisecondsInMonth);
            return `${months}m`;
        } else if (durationInMilliseconds >= millisecondsInDay) {
            const days = Math.floor(durationInMilliseconds / millisecondsInDay);
            return `${days}d`;
        } else if (durationInMilliseconds >= millisecondsInHour) {
            const hours = Math.floor(durationInMilliseconds / millisecondsInHour);
            return `${hours}h`;
        } else if (durationInMilliseconds >= millisecondsInMinute) {
            const minutes = Math.floor(durationInMilliseconds / millisecondsInMinute);
            return `${minutes}min`;
        } else if (durationInMilliseconds >= millisecondsInSecond) {
            const seconds = Math.floor(durationInMilliseconds / millisecondsInSecond);
            return `${seconds}s`;
        } else {
            return 'حالا';
        }
    }
    return (
        <div className="manga-card m-3 bg-base-300  mb-5 mt-5">
            <div className="manga-card--info">
                <Link to={`/manga/${manga.slug}`}
                      className="manga-card--info--title hover:text-primary duration-300">
                    {
                        manga.title.split(" ").map((word, index) => {
                            return <span className={(index < 1) ? "text-primary " : ""} key={index}>{word} </span>
                        })
                    }
                </Link>
                <div className="ml-auto mb-2 w-full px-3 ">

                    {
                        manga.chapters.slice(Math.max(manga.chapters.length - 3, 0)).map((chapter, index) => {
                            return <Link key={index} to={`/manga/${manga.slug}/${chapter.number}`}

                                         className={
                                             `btn px-2 btn-sm bg-base-100 w-full relative h-9 flex justify-end ${
                                                 index === 0 ? "rounded-b rounded-lg" : ""
                                             } ${
                                                 index === 1 ? "rounded" : ""
                                             } ${
                                                 index === 2 ? "rounded-t rounded-lg" : ""
                                             }`
                                         }>

                                <div className="flex flex-col  justify-center items-start">

                                    {
                                        // is newer than 1 day
                                        dayjs().diff(
                                            dayjs(chapter.created_at),
                                            'day'
                                        ) <= 1 && dayjs().diff(
                                            dayjs(chapter.created_at),
                                            'day'
                                        ) >= 0 &&
                                        <div className=" h-2 w-2 rounded-full bg-primary animate-pulse">

                                        </div>
                                    }

                                    <div className="flex space-x-1 items-center text-xs">
                                        <FaClock className="text-[0.6rem]"/>
                                        <span className="lowercase mt-1">
                                        {
                                            // get the chapter from how match like if it from hour show 1h ,
                                            // if it from day show 1d , if it from month show 1m
                                            formatDuration(dayjs().diff(
                                                dayjs(chapter.created_at),
                                                'millisecond'
                                            ))
                                        }

                                            {/*
                                        {dayjs(chapter.created_at).hour()}h
*/}
                                    </span>
                                    </div>
                                </div>
                                <div className="ml-auto">
                                    <span className="mr-2 font-extrabold text-lg">{chapter.number}</span>

                                    <span>
                                        الفصل
                                    </span>
                                </div>



                            </Link>
                        })
                    }

                </div>
            </div>

            <div className="h-full w-40 flex-none p-2">
                <Link to={`/manga/${manga.slug}`} className="bg-black/20 h-full relative rounded justify-center flex">
                    <img className="rounded drop-shadow-xl object-cover border-primary/30  h-full w-full"
                         src={manga.cover_url || soloLeveling} alt="Manga"/>
                    <div className="absolute bottom-3  flex w-fit  space-x-1">
                        <Rating disabled={true} manga={manga} className="rating-sm bg-base-100 rounded p-2"/>
                        <div className="w-8 h-8 flex-none relative ">
                            <img className="w-full h-full rounded" src={FlagKorean} alt="Korean Flag"/>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
