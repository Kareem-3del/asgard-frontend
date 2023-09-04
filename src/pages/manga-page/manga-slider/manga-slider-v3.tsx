import {Swiper, SwiperSlide} from "swiper/react";
import MangaSlideCardV3 from "./manga-slide.card";
import {FreeMode} from "swiper";
import 'swiper/css';
import React, {useEffect} from "react";
import {IManga} from "../../../interfaces/manga.interface";
import {getTopMangaViewsAPI} from "../../../services/search.service";
import {AxiosResponse} from "axios";

const MangaSliderV3 = () => {
    const [mangaList, setMangaList] = React.useState<IManga[]>([]);
    useEffect(() => {
        getTopMangaViewsAPI().then((res: AxiosResponse<IManga[]>) => {
            setMangaList(res.data);
        });
    }, []);

    return (
        <div className="container mx-auto px-2 my-3">
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={30}
                modules={[FreeMode]}
                className="h-full w-full">


                {
                    mangaList.map((manga, index) => {
                        return <SwiperSlide className="w-96 mb-8" key={index}>
                            <MangaSlideCardV3 manga={manga}/>
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </div>
    )
}
export default MangaSliderV3;
