import {ICreateManga, IUpdateManga} from "../../interfaces/manga.interface";
import useToaster from "../toast/useToaster.hook";
import service from "../../services/manga.service";
import {AxiosError, AxiosResponse} from "axios";
import {IException} from "../../interfaces/exception.interface";

const useManga = () => {
    const {createToast} = useToaster();
    const createManga = async (manga: ICreateManga) => {
        service.createMangaAPI(manga).then((res: AxiosResponse<IException>) => {
            createToast({
                message: res.data.message[0] || "Manga created successfully",
                type: "success",
            });
        }).catch((err: AxiosError<IException>) => {
            createToast({
                title: "حدث خطأ",
                message: ((Array.isArray(err.response?.data.message)) ? err.response?.data.message.join(" ") : err.response?.data.message) || "Something went wrong",
                type: "error",
            });
        });
    }


    const editManga = async (id: number, manga: IUpdateManga) => {
        service.updateMangaAPI(id, manga).then((res: AxiosResponse<IException>) => {
            createToast({
                message: res.data.message[0] || "Manga edited successfully",
                type: "success",
            });
        }).catch((err: AxiosError<IException>) => {
            createToast({
                title: "حدث خطأ",
                message: ((Array.isArray(err.response?.data.message)) ? err.response?.data.message.join(" ") : err.response?.data.message) || "Something went wrong",
                type: "error",
            });
        });
    }

    const getMangaById = async (id: number | string) => {
        return await service.getMangaByIdAPI(id);
    }
    const getManga = async ({offset, limit, startId}: { offset?: number, limit?: number, startId?: number }) => {
        return await service.getMangaAPI({offset, limit, startId});
    }
    const getMangaAdmin = async ({offset, limit, startId}: { offset?: number, limit?: number, startId?: number }) => {
        return await service.getMangaAdminAPI({offset, limit, startId});
    }

    const deleteManga = async (id: number) => {
        return await service.deleteMangaAPI(id);
    }


    return {
        createManga,
        deleteManga,
        editManga,
        getManga,
        getMangaById,
        getMangaAdmin
    }
}

export default useManga
