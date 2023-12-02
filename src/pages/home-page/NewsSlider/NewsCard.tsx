import React from "react";
import soloLeveling from "../../../assets/images/solo-leveling_.png";
import {INews} from "./NewsSlider";
import {Link} from "react-router-dom";
import {BiTimeFive} from "react-icons/bi";
import {FaPlay} from "@react-icons/all-files/fa/FaPlay";
import dayjs from "dayjs";
export default function NewsCard({news}:{news:INews}) {
    const getRand = () => {
        return Math.random().toString(36).substring(7);
    }
    const [url, setUrl] = React.useState<string>(`/news/${news.id}/${getRand()}`);
    return (
        <div className="flex  w-96 h-96  justify-center items-center">


            <div className="card w-96 bg-base-200 z-0 rounded-xl shadow-xl  h-96 overflow-hidden">

                <figure className="h-full w-full relative mb-1">
                    <Link to={url} className="top-2 left-2 btn btn-primary absolute w-12 h-12 rounded-xl text-primary-content">
                    <span className="ml-0.5">
                        <FaPlay className="text-xl"/>
                    </span>
                    </Link>
                    <img className="h-full w-full object-cover" src={news.image} alt="Shoes"/>
                </figure>
                <div className="flex flex-col justify-center  p-4 mt-auto bg-base-300 ">
                    <h2 className="text-right text-2xl font-bold mb-2 w-full ">

                        <Link to={url} onClick={()=>{
                            setUrl(`/news/${news.id}/${getRand()}`);
                        }} className="text-white hover:text-primary transition-colors"> {news.title}</Link>
                    </h2>
                    <div className="card-actions justify-center flex items-center w-full">
                        <Link to={`/user/${news.user.id}`} className="flex hover:hue-rotate-30 transition duration-300 justify-center items-center mr-auto">
                            <img src={news?.user?.cover_url} alt="" className="w-10 h-10 flex-none rounded rounded-r-sm object-cover"/>
                            <h2 className="text-lg bg-base-100 h-10 flex items-center px-2 ml-1 rounded truncate w-24 justify-center rounded-l-sm">{news.user.username}</h2>
                        </Link>
                        <div className="flex space-x-1 justify-center items-center">
                            <span className="text-sm text-gray-400">
                                {dayjs(news.created_at).fromNow()}
                            </span>
                                <BiTimeFive/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
