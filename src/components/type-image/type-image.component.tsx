import {MangaTypesEnum} from "../../interfaces/manga.interface";
import smallKR from "../../assets/FL/kr_small.svg";
import largeKR from "../../assets/FL/kr_large.svg";
import smallJP from "../../assets/FL/jp_small.svg";
import largeJP from "../../assets/FL/jp_large.svg";
import smallCN from "../../assets/FL/cn_small.svg";
import largeCN from "../../assets/FL/cn_large.svg";
import largeWB from "../../assets/FL/wb_large.svg";
import smallWB from "../../assets/FL/wb_small.svg";
import smallBK from "../../assets/FL/bk_small.svg";
import largeBK from "../../assets/FL/bk-large.svg";


interface TypeImageProps {
    mangaType: MangaTypesEnum | string | number,
    className?: string
    largeIcons?: boolean
}

export function TypeImage({mangaType, className, largeIcons}: TypeImageProps) {
    let image = <img alt="status" src={smallKR}/>
    let type = MangaTypesEnum.Manga

    if (typeof mangaType === "string") {
        type = MangaTypesEnum[mangaType as keyof typeof MangaTypesEnum]
    } else if (typeof mangaType === "number") {
        type = mangaType
    }

    switch (type) {
        case MangaTypesEnum.Manhwa:
            image = <img className={className} alt="status" src={(largeIcons) ? smallKR : largeKR}/>
            break;
        case MangaTypesEnum.Manga:
            image = <img className={className} alt="status" src={(largeIcons) ? smallJP : largeJP}/>
            break;
        case MangaTypesEnum.Manhua:
            image = <img className={className} alt="status" src={(largeIcons) ? smallCN : largeCN}/>
            break;
        case MangaTypesEnum.Webtoon:
            image = <img className={className} alt="status" src={(largeIcons) ? smallWB : largeWB}/>
            break;
        case MangaTypesEnum.Novel:
            image = <img className={className} alt="status" src={(largeIcons) ? smallBK : largeBK}/>
    }

    return image
}