import soloLeveling from "../../assets/images/solo-leveling_.png";
import React from "react";
import {TiMessages} from "@react-icons/all-files/ti/TiMessages";
import {BsDiscord} from "react-icons/all";
import {AiFillInstagram} from "@react-icons/all-files/ai/AiFillInstagram";
import AdsComponent from "../../components/ads/ads.component";
import UserInfoComponent from "./UserInfo.component";
import UserLibraryComponent from "./UserLibrary.component";
import {motion} from "framer-motion";
import ads from "../../assets/images/ads.png";

enum tabs {
    "INFO"
    , "LIBRARY"
}


const pageTransition = {
    type: "tween",
    ease: "linear",
    duration: 0.2
};

const UserPage = () => {


    const [tabActive, setTabActive] = React.useState<tabs>(tabs.INFO);


    const pageVariants = {
        initial: {
            opacity: 0,
            x: (tabActive === tabs.INFO) ? "-100%" : "100%"
        },
        in: {
            opacity: 1,
            x: 0
        },
        out: {
            opacity: 0,
            x: (tabActive === tabs.INFO) ? "100%" : "-100%"
        }
    };


    return (
        <div className=" h-full w-full" dir="rtl">
            <div className="w-full bg-base-300 h-96 relative z-10">

                <img src={ads} className="w-full h-full absolute -z-50 object-cover" alt=""/>
                <div className="w-full h-full absolute -z-20  bg-gradient-to-t from-base-100 to-base-100/80"></div>

                <div className=" flex w-full h-full container mx-auto">
                    <div className="flex flex-col flex-none justify-center items-center my-auto mx-10">
                        <div className="flex">
                            <img className="w-52 h-52 object-cover w-full h-full rounded-3xl" src={soloLeveling} alt=""/>
                            <div className=" flex flex-col space-y-3 h-full justify-center mr-3 h-52">

                                <div
                                    className="bg-base-100   p-3 justify-center flex border-primary items-center hover:bg-primary translation duration-300 rounded">
                                    <span className="text-2xl"><BsDiscord/></span>
                                </div>
                                <div
                                    className="bg-base-100   p-3 justify-center flex border-primary items-center hover:bg-primary translation duration-300 rounded">
                                    <span className="text-2xl"><AiFillInstagram/></span>
                                </div>
                                <div
                                    className="bg-base-100   p-3 justify-center flex border-primary items-center hover:bg-primary translation duration-300 rounded">
                                    <span className="text-2xl"><TiMessages/></span>
                                </div>

                            </div>
                        </div>
                        <div className="flex justify-center items-center space-x-1 w-full ml-[62px] mt-3" dir="ltr">
                            <h1 className="text-3xl font-semibold px-3 backdrop-blur-xl bg-white/5 flex justify-center items-center h-12 rounded ">Kareem#555</h1>
                            <button className="h-12 w-12 btn bg-base-300 rounded">E</button>

                        </div>
                    </div>

                    <div className="w-52 flex-none mx-10"/>
                </div>
            </div>


            <div className="w-full m-2 p-5 container mx-auto rounded flex duration-300 transition-all overflow-hidden mt-0">
                <div className="w-9/12">
                    <div className="btn-group" dir="ltr">
                        <div onClick={() => {
                            setTabActive(tabs.LIBRARY)
                        }} className={`btn ${(tabActive == tabs.LIBRARY) ? "btn-active" : ""}`}>المكتبة
                        </div>
                        <div onClick={() => {
                            setTabActive(tabs.INFO)
                        }} className={`btn ${(tabActive == tabs.INFO) ? "btn-active" : ""}`}>اعمالي
                        </div>

                    </div>

                    <div className="h-[450px] bg-base-200 rounded-lg">
                        <motion.div
                            key={tabActive}
                            initial="initial"
                            animate="in"
                            variants={pageVariants}
                            transition={pageTransition}
                        >
                            {tabActive == tabs.INFO && <UserInfoComponent/>}
                            {tabActive == tabs.LIBRARY && <UserLibraryComponent/>}
                        </motion.div>
                    </div>

                </div>
                <div className="w-3/12 bg-base-100 flex mr-4 flex-col mt-auto rounded-lg overflow-hidden">
                    <AdsComponent size={"box-lg"} height="450px" width="100%"/>
                </div>


            </div>


            <div className="container mx-auto">
                <AdsComponent size={"wide-sm"} width="100%"/>
                <br/>
            </div>
        </div>

    )
}

export default UserPage
