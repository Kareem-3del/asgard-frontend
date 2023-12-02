import React, {useEffect} from "react";
import MangaCardHome from "./MangaCardHome/MangaCardHome";
import MangaSlider from "./MangaSlider/MangaSlider";
import NewsSlider from "./NewsSlider/NewsSlider";
import BadgeComponent from "../../components/badge/badge.component";
import {AiFillFire} from "@react-icons/all-files/ai/AiFillFire";
import {HiNewspaper} from "@react-icons/all-files/hi/HiNewspaper";
import MangaCollectionComponent from "../../components/manga-collection/manga-collection.component";
import {BsCollectionPlayFill} from "@react-icons/all-files/bs/BsCollectionPlayFill";
import {getLatestMangaUpdatesAPI} from "../../services/search.service";
import {IManga} from "../../interfaces/manga.interface";
import {AxiosResponse} from "axios";
import MangaSliderMobile from "./MangaSlider/MangaSliderMobile";
import AdsComponent from "../../components/ads/ads.component";
import NewsPage from "../news-page/news.page";
import {Outlet} from "react-router-dom";
import { GiTrophyCup } from "react-icons/gi";

export default function HomePage() {
    const [manga, setManga] = React.useState<IManga[]>([]);
    useEffect(() => {
        getLatestMangaUpdatesAPI().then((res: AxiosResponse<{ items: IManga[], count: number }>) => {
            setManga(res.data.items);
            console.log(res.data.count);
        });
    }, []);


    return (
        <>
            <div className="flex flex-col justify-center items-center z-0">


         {/*       <div className="flex w-full lg:hidden">
                    <MangaSliderMobile/>
                </div>*/}
                <div className="flex w-full {/*max-lg:hidden*/}">
                    <MangaSlider/>
                </div>

                <div className="-mt-8 rounded-2xl overflow-hidden flex justify-center items-center container mx-auto">
                    <AdsComponent width="100%" size={"wide-sm"}/>

                </div>
                <div className="w-full mt-8 px-auto flex justify-center">
                    <BadgeComponent icon={<AiFillFire/>} text="احدث الفصول"/>
                </div>

                <div className="flex justify-center items-center flex-wrap mt-5 container">

                    {
                        manga?.map((manga, index) => {
                            return <MangaCardHome key={index} manga={manga}/>
                        })

                    }

                </div>
                <div className="mt-3 flex justify-center  items-center container mx-auto space-x-3">
                    <AdsComponent width="100%" size={"wide-sm"}/>
                    <AdsComponent width="100%" size={"wide-sm"}/>
                </div>
                <div className="flex container justify-center space-x-3  flex-nowrap my-4" dir="ltr">
             {/*       <div className="w-96 flex-none ">
                        <div className="justify-center items-center flex mb-3">
                            <BadgeComponent icon={<GiTrophyCup/>} text="الافضل"/>
                        </div>
                        <MangaCollectionComponent/>
                    </div>*/}
                    <div className="w-full overflow-x-hidden ">
                        <div className="w-full">
                            <div className="justify-center items-center flex mb-3">
                                <BadgeComponent icon={<HiNewspaper/>} text="أهم الأخبار"/>
                            </div>
                            <NewsSlider/>
                        </div>
                    </div>
                </div>

                <div className="mb-3 flex justify-center items-center container mx-auto">
                    <AdsComponent width="100%" size={"wide-sm"}/>
                </div>

            </div>



            <Outlet/>

        </>
    );
}
