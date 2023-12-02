import React, {useEffect} from "react";
import {Keyboard, Pagination,} from "swiper";
import {Swiper, SwiperRef, SwiperSlide, useSwiper} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import NewsCard from "./NewsCard";
import {IUser} from "../../../interfaces/user.interface";
import {getNews} from "../../../services/news.service";
import {AxiosResponse} from "axios";
import {MdOutlineNavigateBefore, MdOutlineNavigateNext} from "react-icons/all";

export interface INews {
    id: number,
    title: string,
    content: string
    image: string
    user: IUser
    created_at : Date
}

export default function NewsSlider() {
    const [news, setNews] = React.useState<INews[]>()
    const swiperRef = React.useRef<SwiperRef>(null);
    useEffect(() => {
        getNews().then((res: AxiosResponse<INews[]>) => {
            setNews(res.data);
        });
    }, []);
    const swiper = useSwiper();
    const [activeSlide, setActiveSlide] = React.useState(0);
    console.log(activeSlide)

    return (

        <div className="relative w-full">
            <div className="w-full relative rounded-xl overflow-hidden">

                <Swiper

                    ref={swiperRef}
                    slidesPerView={"auto"}
                    spaceBetween={10}
                    keyboard={{
                        enabled: true,
                    }}
                    onSlideChange={(swiper) => {
                        setActiveSlide(swiper.activeIndex);
                    }}
                    onMouseMove={() => {
                        setActiveSlide(swiper.activeIndex);
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false
                    }}
                    centeredSlidesBounds={true}
                    centeredSlides={true}
                    modules={[Keyboard, Pagination]}
                    pagination={{
                        enabled: true,
                        bulletClass: "hidden",
                    }}

                    className=" h-full">

                    {
                        news?.map((item, index) => {
                            return <SwiperSlide className="w-96" key={index}>
                                <NewsCard news={item}/>
                            </SwiperSlide>
                        })
                    }


                </Swiper>
    {/*            <span className="bg-gradient-to-r from-black  h-full w-44 absolute left-0 top-0 z-50 "/>
                <span className="bg-gradient-to-l from-black  h-full w-44 absolute right-0 top-0 z-50 "/>*/}

            </div>
            <div>
                <div
                    className="w-full text-center space-x-3 flex justify-center items-center p-2 mt-3 bg-base-300 rounded-xl rounded-l-md h-fit">

                    <div

                        onClick={() => {
                            swiperRef.current?.swiper.slidePrev();
                        }}
                        className="hover:bg-base-200 bg-base-100 outline-0 p-1 rounded-xl text-2xl text-white">
                        <MdOutlineNavigateBefore/>
                    </div>

                    <div className="flex justify-center items-center space-x-1.5" dir="ltr">
                        {
                            swiperRef.current?.swiper.pagination.bullets.map((slide, index) => {
                                return <div key={index}
                                            className={`w-2.5 h-2.5 rounded-full bg-base-100  ${activeSlide == index ? "!bg-primary" : ""}`}></div>
                            })
                        }

                    </div>

                    <div

                        onClick={() => {
                            swiperRef.current?.swiper.slideNext();
                        }}

                        className="hover:bg-base-200 bg-base-100 outline-0  p-1 rounded-xl  cursor-pointer  text-2xl  text-white">
                        <MdOutlineNavigateNext/>
                    </div>
                </div>
            </div>


        </div>

    );

}
