import React from "react";
import soloLeveling from "../../assets/images/solo-leveling_.png";
const UserLibraryComponent = () => {
    const [mangaList, setMangaList] = React.useState([0,1,2,3,4,5,6,7,8,9]);
    return (
        <React.Fragment>
            <div className="mt-5">
                <ul className=" overflow-hidden overflow-y-scroll flex flex-wrap justify-between">
                    {
                        mangaList.map((manga, index) => <li className="m-2"><MangaCard/></li>)
                    }
                </ul>
            </div>
        </React.Fragment>
    );

}


const MangaCard = () => {
    return (
        <React.Fragment>
            <div className="h-24 w-full flex bg-base-200 w-72">
                <div className="w-20 h-full">
                    <img className="w-full h-full object-cover" src={soloLeveling} alt=""/>
                </div>
                <div className="p-3">
                    <h2 className="card-title">Solo Leveling</h2>
                    <p className="card-subtitle">مانجا</p>

                </div>
            </div>
        </React.Fragment>
    );
}

export default UserLibraryComponent;
