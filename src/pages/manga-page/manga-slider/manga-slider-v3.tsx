import {Swiper, SwiperSlide} from "swiper/react";
import MangaSlideCardV3 from "./manga-slide.card";
import {FreeMode} from "swiper";
import 'swiper/css';
import React, {useEffect} from "react";
import {IManga} from "../../../interfaces/manga.interface";
import {getTopMangaViewsAPI} from "../../../services/search.service";
import {AxiosResponse} from "axios";
import AdsComponent from "../../../components/ads/ads.component";

const MangaSliderV3 = () => {
    const [mangaList, setMangaList] = React.useState<IManga[]>([]);
    useEffect(() => {
        getTopMangaViewsAPI().then((res: AxiosResponse<IManga[]>) => {
            setMangaList(res.data);
        });
    }, []);

    return (
        <div className="container mx-auto px-2">
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={20}
                modules={[FreeMode]}
                breakpoints={{
                    // pc 3 , tablet 2 , mobile 1
                    "640": {
                        "slidesPerView": 1,
                    },
                    "768": {
                        "slidesPerView": 2,
                    },
                    "1024": {
                        "slidesPerView": 4,
                    }
                }}
                className="h-full w-full">
                {
                    mangaList.map((manga, index) => {
                        return <div className="">
                            {index % 2 === 0 && <SwiperSlide className="w-64 h-44">
                                    <AdsComponent width="100%"  height={"100%"} size={"wide-sm"}/>
                            </SwiperSlide>}
                            <SwiperSlide className=" justify-center items-center flex w-64" key={index}>
                                <MangaSlideCardV3 manga={manga}/>
                            </SwiperSlide>
                        </div>
                    })
                }
            </Swiper>
        </div>
    )
}
export default MangaSliderV3;
