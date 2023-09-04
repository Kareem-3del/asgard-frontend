import React, {useEffect} from "react";
import GenresList from "./GenresList";
import {IGenre} from "../../../../interfaces/genre.interface";
import ControlGenres from "./control-genres";
import genreService from "../../../../services/genre.service"
import {AxiosResponse} from "axios";
const GenresAdminPage = () => {

    const editFC = (genre:IGenre)=>{
        const index = genres.findIndex(g => g.id === genre.id);
        genres[index] = genre;
        setGenres([...genres])
    }
    const deleteFC = (genre:IGenre)=>{
        setGenres(genres.filter(g => g.id !== genre.id))
    }
    const [genres, setGenres] = React.useState<IGenre[]>([])

    useEffect(()=>{
        genreService.findAll().then((g:AxiosResponse<IGenre[]>)=>{
            setGenres(g.data)
        })
    },[])


    return (
        <div className="w-full">
            <ControlGenres editGenres={(g)=>{setGenres(g)}} genres={genres}/>
            <GenresList editFC={editFC} deleteFC={deleteFC} genres={genres}/>



        </div>
    );
};

export default GenresAdminPage
