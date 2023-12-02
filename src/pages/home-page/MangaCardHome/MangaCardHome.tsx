import "./MangaCardHome.scss";
import soloLeveling from "../../../assets/images/solo-leveling_.png";
import {IManga} from "../../../interfaces/manga.interface";
import {Link} from "react-router-dom";
import {Rating} from "../../../components/rating/rating.component";
import {FaClock} from "react-icons/all";
import dayjs from "dayjs";
import {TypeImage} from "../../../components/type-image/type-image.component";
import {IChapter} from "../../../interfaces/chapter.interface";

export default function MangaCardHome({manga}: { manga: IManga }) {

    return (
        <div className="manga-card m-3 h-52 rounded-2xl   mb-5 mt-5">
            <div className="manga-card--info px-2 bg-base-300 rounded-md rounded-l-2xl mr-1">
                <Link to={`/manga/${manga.slug}`}
                      className="manga-card--info--title hover:text-primary duration-300">
                    {
                        manga.title.split(" ").map((word, index) => {
                            return <span className={(index < 1) ? "text-primary " : ""} key={index}>{word} </span>
                        })
                    }
                </Link>
                <div className="mb-1.5 w-full px-3">

                    {
                        manga.chapters?.slice(Math.max(manga.chapters.length - 3, 0)).map((chapter, index) => {
                            return <ChapterCard manga={manga} index={index} key={index} chapter={chapter}/>
                        })
                    }

                    {
                        // if chapters less than 3 repeat the last chapter to make it 3
                        manga.chapters?.length < 3 &&
                        Array.from(Array(3 - manga.chapters.length).keys()).map((item, index) => {
                            return <ChapterCard isBlank={true} manga={manga} index={index} key={index}
                                                chapter={manga.chapters[manga.chapters.length - 1]}/>
                        })

                    }

                </div>
            </div>

            <div className="h-full w-40 rounded-md rounded-r-2xl overflow-hidden flex-none">
                <Link to={`/manga/${manga.slug}`} className="bg-black/20 h-full relative rounded justify-center flex">
                    <img className="rounded drop-shadow-xl object-cover border-primary/30  h-full w-full"
                         src={manga.cover_url || soloLeveling} alt="Manga"/>

                    <div className="absolute bottom-3  flex w-fit  space-x-1">

                        <Rating disabled={true} manga={manga}
                                className="rating-xs bg-base-100 rounded-r-none w-full px-3 rounded p-1.5 "/>
                        <TypeImage mangaType={manga.type} largeIcons={true}
                                   className="w-6 h-6 drop-shadow-xl shadow-2xl rounded-l-none rounded "/>
                    </div>
                </Link>
            </div>
        </div>
    );
}

const ChapterCard = ({chapter, manga, index, isBlank}: { chapter: IChapter, manga: IManga, index: number, isBlank?: boolean }) => {
    function formatDuration(durationInMilliseconds: number) {
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
        <Link  to={isBlank ? "#" : `/manga/${manga?.slug}/${chapter?.number}`}

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
                    !isBlank && dayjs().diff(
                        dayjs(chapter.created_at),
                        'day'
                    ) <= 1 && dayjs().diff(
                        dayjs(chapter.created_at),
                        'day'
                    ) >= 0 &&
                    <div className=" absolute top-1 left-1 h-1.5 w-1.5 rounded-full bg-primary animate-pulse">

                    </div>
                }

                <div className="flex font-light absolute bottom-1 left-2  space-x-1 items-center text-xs">
                    {
                        !isBlank && <FaClock className="text-[0.6rem]"/>
                    }
                    <span className="lowercase mt-[1.5px] text-[0.7rem]">
                                        {!isBlank &&
                                            // get the chapter from how match like if it from hour show 1h ,
                                            // if it from day show 1d , if it from month show 1m
                                            formatDuration(dayjs().diff(
                                                dayjs(chapter.created_at),
                                                'millisecond'
                                            ))
                                        }
                                    </span>
                </div>
            </div>
            <div className="ml-auto font-medium flex justify-center items-center">
                <span className="mr-1 font-medium text-lg ">{!isBlank && chapter.number}</span>

                {!isBlank &&
                    <span>
                                        الفصل
                                    </span>}
            </div>


        </Link>
    )
}
