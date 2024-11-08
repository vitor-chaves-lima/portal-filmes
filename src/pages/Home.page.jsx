import MovieSliderSection from "../components/MovieSliderSection.jsx";
import {useLoaderData} from "react-router-dom";

const HomePage = () => {
    const {popularMovies, upcomingMovies, topRatedMovies} = useLoaderData()

    return <div className={"flex flex-col"}>
        <MovieSliderSection icon={"🎬"} name={"Popular movies"} data={popularMovies}/>
        <MovieSliderSection icon={"📅"} name={"Upcomming movies"} data={upcomingMovies}/>
        <MovieSliderSection icon={"🏆"} name={"Top rated"} data={topRatedMovies}/>
    </div>
}

export default HomePage;