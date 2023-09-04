import {useHref, useNavigate, useParams, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getNewsById} from "../../services/news.service";
import {INews} from "../home-page/NewsSlider/NewsSlider";
import {AxiosResponse} from "axios";
import { motion } from "framer-motion";

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0.3, x: "-100%" },
}
export const NewsPage = () => {
    const {id , rand} = useParams();
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState<INews>();
    useEffect(() => {
        setNews(undefined);
        setLoading(true);
        setIsOpen(true);

        if(id && isNaN(Number(id))) {
           alert("Invalid news id");
        }
        getNewsById(Number(id)).then((res: AxiosResponse<INews>) => {
            setLoading(false);
            setNews(res.data);

        }).catch((err) => {
            history.replaceState({},"/404");
        });
    }, [id,rand]);

    return (
        <motion.div className="w-full h-full fixed top-0 left-0 z-50"
                    initial={
                        {
                            opacity: 0,
                            x: "-100%"
                        }
                    }
                    animate={isOpen ? "open" : "closed"}
                    variants={variants}>
            <div className="absolute -z-10 w-full h-full " onClick={()=>{
                setIsOpen(false);
            }}/>
            <div className="max-w-3xl bg-black h-full w-full mx-auto z-10 p-5">
                {
                    loading && <div className="flex flex-col justify-center items-center text-white text-5xl h-full">
                        Loading...
                    </div>
                }
                <div dangerouslySetInnerHTML={{__html: news?.content || ""}}/>
            </div>

        </motion.div>

    )
}
export default NewsPage;
