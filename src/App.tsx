import HomePage from "./pages/home-page/HomePage";
import Footer from "./components/footer/footer";
import Header from "./components/header/Header";
import MangaPage from "./pages/manga-page/MangaPage";
import {Route, Routes} from "react-router-dom";
import UserPage from "./pages/user-page/user.page";
import UserInfoComponent from "./pages/user-page/UserInfo.component";
import React from "react";
import ChapterPage from "./pages/chapter-page/ChapterPage";
import SearchPage from "./pages/search-page/search.page";
import LoginPage from "./pages/login-page/login.page";
import Toaster from "./components/toaster/toaster.component";
import AccountPage from "./pages/account/account.page";
import LogoutComponent from "./components/logout/logout.component";
import MyLibraryPage from "./pages/account/user/my-library/my-library.page";
import MyFavoritesPage from "./pages/account/user/my-favorites/my-favorites.page";
import MyAccountPage from "./pages/account/user/my-account/my-account.page";
import GenresAdminPage from "./pages/account/admin/genres-page/genres-admin.page";
import MangaAdminPage from "./pages/account/admin/manga-page/manga-admin.page";
import RolesAdminPage from "./pages/account/admin/roles-page/roles.page";
import UsersAdminPage from "./pages/account/admin/users-page/users.page";
import {NewsAdminPage} from "./pages/account/admin/news-page/news-admin.page";
import NewsPage from "./pages/news-page/news.page";
import MyChatPage from "./pages/account/user/my-chat/my-chat.page";
import RegisterPage from "./pages/login-page/register.page";
import BinAdminPage from "./pages/account/admin/bin-admin/bin-admin.page";
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import relativeTime from "dayjs/plugin/relativeTime";
function App() {
    dayjs.extend(relativeTime)
    dayjs().locale('ar')
    return (
        <div>
            <p hidden className="text-success-content text-warning  bg-success bg-error text-error-content text-info-content bg-info bg-warning text-warning-content"></p>

            <div className="drawer  drawer-end">
                <input id="sidebar" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content z-0 flex h-full flex-col">
                    <Header/>
                    <div className="  relative max-w-screen  h-full p-0">
                        <Routes>
                            <Route path="" element={<HomePage/>}>
                                <Route path="news/:id/:rand" index element={<NewsPage/>}/>
                            </Route>
                            <Route path="manga">
                                <Route path="" element={<SearchPage/>}/>
                                <Route path=":mangaSlug" element={<MangaPage/>}/>
                                <Route path=":mangaSlug/:chapterNumber" element={<ChapterPage/>}/>
                            </Route>

                            <Route path="user/:userId" element={<UserPage />}>
                                <Route index element={<UserInfoComponent/>}/>
                            </Route>
                            <Route path="/auth">
                                <Route path="login" element={<LoginPage/>}/>
                                <Route path="register" element={<RegisterPage/>}/>

                            </Route>
                            <Route path="/account" element={<AccountPage/>}>
                                <Route index element={<MyAccountPage/>}/>
                                <Route path="favorites" element={<MyFavoritesPage/>}/>
                                <Route path="library" element={<MyLibraryPage/>}/>
                                <Route path="chat" element={<MyChatPage/>}/>
                                <Route path="admin/bin" element={<BinAdminPage/>}/>
                                <Route path="admin/manga" element={<MangaAdminPage/>}/>
                                <Route path="admin/genres" element={<GenresAdminPage/>}/>
                                <Route path="admin/roles" element={<RolesAdminPage/>}/>
                                <Route path="admin/users" element={<UsersAdminPage/>}/>
                                <Route path="admin/news" element={<NewsAdminPage/>}/>
                            </Route>
                            <Route path="/logout" element={<LogoutComponent/>}/>
                        </Routes>
                    </div>
                </div>
                <Toaster/>
                <Footer/>

            </div>

        </div>
    )
}


export default App
