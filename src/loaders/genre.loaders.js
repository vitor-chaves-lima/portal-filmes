import {buildEndpointFetch} from "../utils/moviedb.js";
import {defer} from "react-router-dom";

const fetchMoviesGenres = async () => {
    const upcomingMovies = await buildEndpointFetch("genre/movie/list")

    const upcomingMoviesJSON = await upcomingMovies.json();
    return upcomingMoviesJSON["genres"];
}

const fetchGenreMoviesList = async (genreId, page = 1) => {
    const genreMovies = await buildEndpointFetch(`discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`);
    return await genreMovies.json();
}

const fetchGenreNameById = async (genreId) => {
    const moviesGenres = await fetchMoviesGenres();

    return moviesGenres.find(genre => genre.id === parseInt(genreId))?.name;
}

const genreLoader = async () => {
    let moviesGenres = fetchMoviesGenres();

    return defer({
        moviesGenres,
    })
}

const moviesByGenreLoader = async (request) => {
    const url = new URL(request.request.url);
    let page = url.searchParams.get("page");
    let genreId = request.params.id;

    if (page === null) {
        page = 1;
    }

    let data = fetchGenreMoviesList(genreId, page);

    return defer({
        genreName: await fetchGenreNameById(genreId),
        data,
    })
}


export {genreLoader, moviesByGenreLoader}