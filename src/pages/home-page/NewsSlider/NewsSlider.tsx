import React, {useEffect} from "react";
import {Keyboard, Pagination,} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import NewsCard from "./NewsCard";
import {IUser} from "../../../interfaces/user.interface";
import {getNews} from "../../../services/news.service";
import {AxiosResponse} from "axios";

export interface INews {
    id: number,
    title: string,
    content: string
    image: string
    user : IUser
}
export default function NewsSlider() {
    const [news, setNews] = React.useState<INews[]>()

    useEffect(() => {
        getNews().then((res: AxiosResponse<INews[]>) => {
            setNews(res.data);
        });
    },[]);
    return (
        <div className="relative w-full bg-base-300 rounded p-3">
            <div className="w-full">

                <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={10}
                    keyboard={{
                        enabled: true,
                    }}

                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false
                   }}
                    centeredSlidesBounds={true}
                    centeredSlides={true}
                    modules={[Keyboard]}
                    className="mySwiper h-full">

                    {
                        news?.map((item, index) => {
                            return <SwiperSlide className="w-96" key={index}>
                                <NewsCard  news={item}/>
                            </SwiperSlide>
                        })
                    }



                </Swiper>
            </div>


        </div>
    );
}
