import {buildEndpointFetch} from "../utils/moviedb.js";
import {defer} from "react-router-dom";

const fetchUpcomingMovies = async () => {
    const upcomingMovies = await buildEndpointFetch("/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc")

    const upcomingMoviesJSON = await upcomingMovies.json()
    return upcomingMoviesJSON["results"];
}

const homePageLoader = async () => {
    let upcomingMovies = fetchUpcomingMovies()

    return defer({
        upcomingMovies
    })
}

export default homePageLoader