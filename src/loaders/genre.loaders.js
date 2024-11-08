import {buildEndpointFetch} from "../utils/moviedb.js";
import {defer} from "react-router-dom";

const fetchMoviesGenres = async () => {
    const upcomingMovies = await buildEndpointFetch("genre/movie/list")

    const upcomingMoviesJSON = await upcomingMovies.json();
    return upcomingMoviesJSON["genres"];
}

const genreLoader = async () => {
    let moviesGenres = fetchMoviesGenres();

    return defer({
        moviesGenres,
    })
}

export default genreLoader