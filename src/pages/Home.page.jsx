import MovieSection from "../components/MovieSection.jsx";
import {useLoaderData} from "react-router-dom";

const HomePage = () => {
    const {popularMovies, upcomingMovies, topRatedMovies} = useLoaderData()

    return <div className={"flex flex-col"}>
        <MovieSection icon={"🎬"} name={"Popular movies"} data={popularMovies}/>
        <MovieSection icon={"📅"} name={"Upcomming movies"} data={upcomingMovies}/>
        <MovieSection icon={"🏆"} name={"Top rated"} data={topRatedMovies}/>
    </div>
}

export default HomePage;