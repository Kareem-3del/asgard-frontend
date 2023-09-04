import {MangaTypesEnum, StatusTypeEnum} from "../interfaces/manga.interface";
import KoreanFlag from "../assets/images/img.png";

export const getTypeFlag = (type: MangaTypesEnum) => {

    switch (type) {
        case MangaTypesEnum.Manga:
            return KoreanFlag;
        case MangaTypesEnum.Manhwa:
            return KoreanFlag;
        case MangaTypesEnum.Manhua:
            return KoreanFlag;
        case MangaTypesEnum.Webtoon:
            return KoreanFlag;
        case MangaTypesEnum.Novel:
            return KoreanFlag;

    }
};
export const getTypeAr = (type: MangaTypesEnum) => {

        switch (type) {
            case MangaTypesEnum.Manga:
                return "مانجا";
            case MangaTypesEnum.Manhwa:
                return "مانهوا";
            case MangaTypesEnum.Manhua:
                return "مانهوا";
            case MangaTypesEnum.Webtoon:
                return "ويبتون";
            case MangaTypesEnum.Novel:
                return "رواية";

        }
}

export const getStatusAr = (status: StatusTypeEnum) => {
    switch (status) {
        case StatusTypeEnum.Finished:
            return "منتهي";
        case StatusTypeEnum.Stopped:
            return "متوقف";
        case StatusTypeEnum.Ongoing:
            return "مستمر";
    }
}
export const getStatusColor = (status: StatusTypeEnum) => {
    switch (status) {
        case StatusTypeEnum.Finished:
            return "green";
        case StatusTypeEnum.Stopped:
            return "red";
        case StatusTypeEnum.Ongoing:
            return "blue";
    }
}

