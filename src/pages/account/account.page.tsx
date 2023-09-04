import {FaUserCircle} from "@react-icons/all-files/fa/FaUserCircle";
import React from "react";
import {Outlet, NavLink} from "react-router-dom";
import {IoLibrary, MdCategory, RiDeleteBinFill, SiGooglenews} from "react-icons/all";
import {MdFavorite} from "@react-icons/all-files/md/MdFavorite";
import {SiGooglemessages} from "@react-icons/all-files/si/SiGooglemessages";
import {FaUsersCog} from "@react-icons/all-files/fa/FaUsersCog";
import {HiNewspaper} from "@react-icons/all-files/hi/HiNewspaper";
import {MdPermContactCalendar} from "@react-icons/all-files/md/MdPermContactCalendar";

const links = [
    {
        label: "حسابي",
        icon: <FaUserCircle/>,
        to: "/account/"
    },
    {
        label: "المفضلة",
        icon: <MdFavorite/>,
        to: "favorites",
        disabled: true
    },
    {
        label: "الرسائل",
        icon: <SiGooglemessages/>,
        to: "chat",
    },
    {
        label: "اعمالي",
        icon: <IoLibrary/>,
        to: "library"
    },
    {
        label: "المانجا",
        icon: <SiGooglenews/>,
        to: "admin/manga",
    },
    {
        label: "التصنيفات",
        icon: <MdCategory/>,
        to: "admin/genres",
    },
    {
        label: "المستخدمين",
        icon: <FaUsersCog/>,
        to: "admin/users",
    },
    {
        label: "الصلاحيات",
        icon: <MdPermContactCalendar/>,
        to: "admin/roles"
    },
    {
        label: "الاخبار",
        icon: <HiNewspaper/>,
        to: "admin/news",
    },
    {
        label: "المحذوفات",
        icon: <RiDeleteBinFill/>,
        to: "admin/bin",
    },


]
const AccountPage = () => {
    return (
        <div className="flex xl:flex-row md:flex-col w-full h-full max-sm:flex-col" dir="rtl">
            <SideBar/>
            <div className="w-full max-h-screen overflow-y-scroll px-3 h-full flex bg-base-100">
                <Outlet/>
            </div>
        </div>
    )
}
const SideBar = () => {
    return (
        <ul className="p-2 max-sm:no-scrollbar flex-nowrap flex-none max-sm:space-x-2 max-sm:h-28 max-sm:overflow-x-scroll lg:w-72 lg:mx-none menu  bg-base-300 max-lg:bg-base-300  md:w-full max-lg:justify-center md:space-y-3   ">

            {links.map((link) => (
                <li>
                    <NavLink to={link.to} className="rounded-box h-14 btn">
                        <div className="flex items-center justify-center lg:w-32">
                            <span className="flex items-center justify-center text-2xl w-10 ">{link.icon}</span>

                            <span
                                className="flex items-center max-lg:hidden text-md font-semibold text-right mr-3  w-24 ">{link.label}</span>
                        </div>
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}
export default AccountPage;
