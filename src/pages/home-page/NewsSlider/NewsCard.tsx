import React from "react";
import soloLeveling from "../../../assets/images/solo-leveling_.png";
import {INews} from "./NewsSlider";
import {Link} from "react-router-dom";
import {BiTimeFive} from "react-icons/bi";
export default function NewsCard({news}:{news:INews}) {
    const getRand = () => {
        return Math.random().toString(36).substring(7);
    }
    const [url, setUrl] = React.useState<string>(`/news/${news.id}/${getRand()}`);
    return (
        <div className="flex  w-96 h-96  justify-center items-center">


            <div className="card w-96 bg-base-200 z-0 shadow-xl relative h-96 overflow-hidden">
                <figure className="h-full absolute -z-10 w-full ">
                    <span className="bg-gradient-to-t from-black  absolute w-full h-full"/>
                    <img className="h-full w-full object-cover" src={news.image} alt="Shoes"/>
                </figure>
                <div className="flex flex-col justify-center  p-4 mt-auto">
                    <h2 className="text-right text-2xl font-bold mb-2 w-full ">

                        <Link to={url} onClick={()=>{
                            setUrl(`/news/${news.id}/${getRand()}`);
                        }} className=""> {news.title}</Link>
                    </h2>
                    <div className="card-actions justify-center flex items-center w-full">
                        <div className="flex justify-center items-center space-x-3 mr-auto">
                            <img src={soloLeveling} alt="" className="w-10 h-10 rounded-xl object-cover"/>
                            <h2 className="text-lg">{news.user.username}</h2>
                        </div>
                        <div className="flex space-x-1 justify-center items-center">
                            <span className="text-sm text-gray-400">2 hours ago</span>
                                <BiTimeFive/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
