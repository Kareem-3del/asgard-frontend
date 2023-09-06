import React, {useEffect} from "react";
import {Keyboard, Pagination, Navigation} from "swiper";
import {Swiper, SwiperSlide, useSwiper} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SliderCard from "./SliderCard";
import soloLeveling from "../../../assets/images/solo-leveling_.png";
import {IManga} from "../../../interfaces/manga.interface";
import {getTopMangaViewsAPI} from "../../../services/search.service";
import {AxiosResponse} from "axios";
import { motion } from "framer-motion";

export default function MangaSlider() {
    const [mangaList, setMangaList] = React.useState<IManga[]>([]);
    const [activeSlide, setActiveSlide] = React.useState(0);
    const swiperModule = useSwiper();
    useEffect(() => {
        getTopMangaViewsAPI().then((res:AxiosResponse<IManga[]>) => {
            setMangaList(res.data);
        });
    },[]);
    return (
        <div className="relative h-[500px] w-full z-0">
            <div className="absolute h-full -z-50 top-0 w-full left-0">

                <motion.img
                    transition={{duration: 0.5}}
                    initial={{opacity: 0}}
                    loading={"lazy"}
                    animate={{opacity: 1}}
                    key={`active_background_slide_${activeSlide}`} className="w-full h-full z-0 object-cover object-top" src={mangaList[activeSlide]?.background_url||soloLeveling}/>
                <div
                    className="h-full w-full z-10 absolute left-0 top-0 bg-gradient-to-tr from-base-100 to-transparent"
                    style={{
                        background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                    }}
                ></div>
            </div>
            <div className="w-full h-96 mt-10">

                <Swiper
                    onSlideChange={(swiper) => {
                        setActiveSlide(swiper.activeIndex);
                    }}
                    onMouseMove={() => {
                        setActiveSlide(swiperModule.activeIndex);
                    }}
                    slidesPerView={1}
                    spaceBetween={30}
                    keyboard={{
                        enabled: true,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Keyboard, Pagination, Navigation]}
                    className="mySwiper h-full z-50">

                    {
                        mangaList?.map((manga) => {
                            return <SwiperSlide key={`slider_${manga.id}`}>
                                <SliderCard manga={manga}/>
                                    </SwiperSlide>
                        })

                    }

                </Swiper>
            </div>
        </div>
    );
}
