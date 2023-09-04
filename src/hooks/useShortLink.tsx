import {createShortLinkAPI , getShortLinkAPI , editShortLinkAPI} from '../services/short-link.service';
import {useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import {IShortLink} from "../interfaces/short-link.interface";
import useToaster from "./toast/useToaster.hook";

export const useShortLink = () => {
    const [loading, setLoading] = useState(false);
    const toaster = useToaster();

    const createShortLink = async (chapterId: number , uuid : string , url : string) : Promise<IShortLink> => {
        return new Promise<IShortLink>(async (resolve, reject) => {
            setLoading(true);
            await createShortLinkAPI(chapterId,url , uuid).then((response: AxiosResponse<IShortLink>) => {
                return resolve(response.data);
            }).catch((error: AxiosError) => {
                toaster.createToast({
                    message: error.message,
                    type: 'error'
                });
                reject(error);
            }).finally(() => {
                setLoading(false);
            });
        });
    };

    const getShortLink = async (chapterId: number) => {
        setLoading(true);
        getShortLinkAPI(chapterId).then(({data} : AxiosResponse<IShortLink>) => {
            return data
        }).catch((error : AxiosError) => {
            toaster.createToast({
                message: error.message,
                type: 'error'
            })
        });
    };

    const editShortLink = async (shortLinkId: string, longUrl: string) => {
        setLoading(true);
        editShortLinkAPI(shortLinkId, longUrl).then(({data} : AxiosResponse<IShortLink>) => {
            return data
        }).catch((error : AxiosError) => {
            toaster.createToast({
                message: error.message,
                type: 'error'
            })
        });
    }

    return {loading, createShortLink, getShortLink , editShortLink};
}
