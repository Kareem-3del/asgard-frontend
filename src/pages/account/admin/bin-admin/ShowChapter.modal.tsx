import {motion} from "framer-motion";
import React from "react";
import {Image} from "../../../chapter-page/ChapterPage";
import {IChapter} from "../../../../interfaces/chapter.interface";

export const ShowChapterModal = ({chapter}: {chapter : IChapter}) => {
   return (
       <>
           <div className="modal" id="show-chapter">
               <div className="modal-box flex flex-col">
                   <h3 className="font-bold text-xl text-center">{chapter?.title} </h3>
                  <div className="h-full overflow-y-scroll">
                      <motion.div
                          className="flex flex-col justify-center items-center"
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          transition={{duration: 0.3}}
                          key={chapter?.number}>
                          {
                              chapter?.images_urls.map((image, index) => <Image src={image} key={`chapter_image_${index}`}/>)
                          }
                      </motion.div>
                  </div>
                   <div className="modal-action">
                       <a href="#" className="btn w-full">حسناً!</a>
                   </div>
               </div>
           </div>

       </>
   )
}