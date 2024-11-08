import {buildEndpointFetch} from "../utils/moviedb.js";
import {defer} from "react-router-dom";

const fetchUpcomingMovies = async () => {
    const upcomingMovies = await buildEndpointFetch("/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc")

    const upcomingMoviesJSON = await upcomingMovies.json();
    return upcomingMoviesJSON["results"];
}

const fetchPopularMovies = async () => {
    const popularMovies = await buildEndpointFetch("/movie/upcoming?language=en-US&page=1");

    const upcomingMoviesJSON = await popularMovies.json();
    return upcomingMoviesJSON["results"];
}

const fetchTopRatedMovies = async () => {
    const topRatedMovies = await buildEndpointFetch("/movie/top_rated?language=en-US&page=1");

    const topRatedMoviesJSON = await topRatedMovies.json();
    return topRatedMoviesJSON["results"];
}

const homePageLoader = async () => {
    let upcomingMovies = fetchUpcomingMovies();
    let popularMovies = fetchPopularMovies();
    let topRatedMovies = fetchTopRatedMovies();

    return defer({
        upcomingMovies,
        popularMovies,
        topRatedMovies
    })
}

export default homePageLoader