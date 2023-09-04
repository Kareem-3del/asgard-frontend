import React, {useEffect} from "react";

import {Keyboard, Pagination, Autoplay , FreeMode} from "swiper";

import {Swiper, SwiperSlide, useSwiper} from "swiper/react";

import soloLeveling from "../../../assets/images/solo-leveling_.png";

import {IManga} from "../../../interfaces/manga.interface";

import {getTopMangaViewsAPI} from "../../../services/search.service";

import {AxiosResponse} from "axios";

import { motion } from "framer-motion";

import MangaSlideMobile from "./MangaSlideMobile";

export default function MangaSliderMobile() {
    const [mangaList, setMangaList] = React.useState<IManga[]>([]);
    const [activeSlide, setActiveSlide] = React.useState(0);
    const swiperModule = useSwiper();
    useEffect(() => {
        getTopMangaViewsAPI().then((res:AxiosResponse<IManga[]>) => {
            setMangaList(res.data);
        });
    },[]);
    return (
        <div className="relative h-[600px] w-full z-0">
            <div className="absolute h-full -z-50 top-0 w-full left-0">

                <motion.img
                    transition={{duration: 0.5}}
                    initial={{opacity: 0}}
                    loading={"lazy"}
                    animate={{opacity: 1}}
                    key={`active_background_slide_${activeSlide}`} className="w-full h-full z-0 object-cover object-top" src={mangaList[activeSlide]?.background_url||soloLeveling}/>

                <div
                    className="h-full w-full z-10 absolute left-0 top-0 bg-gradient-to-t from-base-100 to-transparent"></div>
            </div>
            <div className="w-full  mt-10">

                <Swiper
                    onSlideChange={(swiper) => {setActiveSlide(swiper.activeIndex);}}
                    onMouseMove={(e) => {setActiveSlide(swiperModule.activeIndex);}}
                    slidesPerView={"auto"}
                    spaceBetween={20}
                    pagination={
                        {
                            clickable: true,
                            type: "bullets",
                            el: ".swiper-pagination",
                            bulletClass: "bg-base-300 h-2 w-2 rounded-full mx-1 inline-block",
                            bulletActiveClass: "bg-primary",
                        }
                    }
                    autoplay={{delay: 5000, disableOnInteraction: false,}}
                    modules={[Keyboard ,Pagination,Autoplay , FreeMode]}

                    // keyboard={{enabled: true,}}
                    breakpoints={{
                        // when window width is >= 640px
                        0: {
                            slidesPerView: 1,
                            centeredSlides:true,
                            centeredSlidesBounds:true,
                            centerInsufficientSlides:true,
                        },
                        // when window width is >= 768px
                        768: {
                            slidesPerView: "auto",
                            centeredSlides: true,
                             centeredSlidesBounds: true,
                            freeMode:true,
                        },
                    }}


                    className="mySwiper h-full z-50">

                    {
                        mangaList.map((manga) => {
                            return <SwiperSlide className="w-80" key={manga.id}>
                                <MangaSlideMobile manga={manga}/>
                            </SwiperSlide>
                        })

                    }

                    <div className="w-full mt-10">
                        <div className="swiper-pagination"></div>
                    </div>

                </Swiper>
            </div>
        </div>
    );
}
