import React, {useEffect} from "react";
import {Keyboard, Pagination, Navigation} from "swiper";
import {Swiper, SwiperRef, SwiperSlide, useSwiper} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SliderCard from "./SliderCard";
import soloLeveling from "../../../assets/images/solo-leveling_.png";
import {IManga} from "../../../interfaces/manga.interface";
import {getTopMangaViewsAPI} from "../../../services/search.service";
import {AxiosResponse} from "axios";
import { motion } from "framer-motion";
import {GrFormNext} from "@react-icons/all-files/gr/GrFormNext";
import {GrNext, MdOutlineNavigateBefore, MdOutlineNavigateNext} from "react-icons/all";

export default function MangaSlider() {
    const [mangaList, setMangaList] = React.useState<IManga[]>([]);
    const [activeSlide, setActiveSlide] = React.useState(0);
    const swiperRef = React.useRef<SwiperRef>(null);
    const swiperModule = useSwiper();
    useEffect(() => {
        getTopMangaViewsAPI().then((res:AxiosResponse<IManga[]>) => {
            setMangaList(res.data);
        });
        console.log(swiperModule);
    },[]);
    useEffect(() => {
        console.log(swiperModule)
    }, [swiperModule]);
    return (
        <div className="relative h-full lg:h-[500px] w-full z-0">
            <div className="absolute h-full -z-50 top-0 w-full left-0">

                <motion.img
                    transition={{duration: 0.5}}
                    initial={{opacity: 0}}
                    loading={"lazy"}
                    animate={{opacity: 1}}
                    key={`active_background_slide_${activeSlide}`} className="w-full h-full z-0 object-cover object-top" src={mangaList[activeSlide]?.background_url||soloLeveling}/>
                <div
                    className="h-full w-full bg-base-100 z-10 absolute left-0 top-0 bg-gradient-to-tr from-base-100 to-transparent"
                    style={{
                        background: "linear-gradient(9deg, hsl(var(--b1)) 44%, hsl(var(--p)/0.2))",
                    }}
                ></div>
            </div>
            <div className="w-full h-full lg:h-96 mt-10">

                <Swiper

                    ref={swiperRef}
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
                    modules={[Keyboard, Pagination, Navigation]}
                    className="h-full z-50">


                    {

                        mangaList?.map((manga) => {
                            return <SwiperSlide key={`slider_${manga.id}`}>
                                <SliderCard
                                    mobile_nav={
                                        {
                                            count: mangaList.length,
                                            active: swiperModule?.activeIndex === activeSlide,
                                            activeFn: (index:number) => {
                                                swiperRef.current?.swiper.slideTo(index);
                                            },
                                            index: activeSlide
                                        }
                                    }

                                    manga={manga}/>
                                    </SwiperSlide>
                        })

                    }
                </Swiper>




            </div>
            <div>
                <div className="w-full text-center space-x-3 z-50  absolute flex justify-center items-center left-0 bottom-16 h-fit">

                    <div

                        onClick={() => {
                            swiperRef.current?.swiper.slidePrev();
                        }}
                        className="hover:bg-base-200 bg-base-300 outline-0 cursor-pointer text-xl rounded-xl h-8 w-8 justify-center items-center flex">
                        <span>
                            <MdOutlineNavigateBefore/>
                        </span>
                    </div>

                <div className="flex justify-center items-center space-x-1.5" dir="ltr">
                    {
                        mangaList?.map((manga, index) => {
                            return <div key={index} className={`w-2.5 h-2.5 rounded-full bg-base-300 ${activeSlide == index ? "bg-primary" : ""}`}></div>
                        })
                    }
                </div>

                    <div

                        onClick={() => {
                            swiperRef.current?.swiper.slideNext();
                        }}

                        className="hover:bg-base-200 bg-base-300 outline-0 cursor-pointer text-xl rounded-xl h-8 w-8 justify-center items-center flex">
                        <span className="w-fit h-fit">
                                                    <MdOutlineNavigateNext/>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
