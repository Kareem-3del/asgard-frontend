import React from "react";

const MangaStoryComponent = ({story} : {story : string}) => {

    return (
        <div className="text-center text-xl p-5  bg-base-300 rounded-xl h-full  flex justify-center items-center">
            <p className="line-clamp">
                {story}
            </p>
        </div>
    );

}

export default MangaStoryComponent
