import React from "react";

const MangaStoryComponent = ({story} : {story : string}) => {

    return (
        <div className=" flex-none text-center text-xl p-5 h-fit bg-base-300 rounded min-h-[300px] justify-center items-center flex">
            <p>
                {story}
            </p>
        </div>
    );

}

export default MangaStoryComponent
