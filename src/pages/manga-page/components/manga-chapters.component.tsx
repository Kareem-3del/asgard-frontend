import {Link} from "react-router-dom";
import "../scss/MangaChapters.scss";
import {FaArrowLeft} from "react-icons/all";
import {HiLockClosed} from "@react-icons/all-files/hi/HiLockClosed";
import {IChapter} from "../../../interfaces/chapter.interface";
import dayjs from "dayjs";

const MangaChaptersComponent = ({chapters}: { chapters: IChapter[] }) => {

    return (
        <div className="text-primary-content w-full p-2 bg-base-300 mr-2 rounded-sm max-h-[30.5em] overflow-y-scroll">
            <ul dir="rtl" className=" space-y-2  flex flex-col min-h-[440px]">

                {
                    chapters?.map((item, index) => {
                        return (
                            <ChapterCard badge={item.badge} key={`${item.id}_${item.number}`}
                                         shortLink={item.short_link?.redirect_url}
                                         chapterDate={new Date(item.created_at)} chapterNumber={item.number}
                                         chapterTitle={item.title}/>
                        )
                    })
                }


            </ul>
        </div>
    );
}

export default MangaChaptersComponent;


interface ChapterCardProps {
    chapterNumber: number,
    chapterTitle: string,
    chapterDate: Date,
    shortLink?: any,
    badge?: string
}

const ChapterCard = (props: ChapterCardProps) => {
    return (
        <li className="flex w-full text-base-content relative">
            {
                props.badge &&
                <span className="badge badge-primary animate-pulse -top-1 -left-1 absolute">
                {props.badge}
                </span>
            }
            <Link to={`./${props.chapterNumber}`}
                  className="manga-chapters-link  px-2 bg-base-200  w-full flex justify-center items-center p-2 rounded-sm hover:bg-base-200/80 transition-all duration-300">
                <h2 className="text-base-content text-md font-bold flex navbar-start w-24">
                    {(props.shortLink) && <span className="ml-2 text-error"><HiLockClosed/></span>}
                    الفصل
                    <span className="mr-2 text-base-content">{props.chapterNumber}</span>
                </h2>

                <h2 className="mx-auto text-base-content">{props.chapterTitle}</h2>

                <span className="navbar-end w-24 text-base-content">{
                    dayjs(props.chapterDate).fromNow()
                }</span>
            </Link>
        </li>
    )
}
