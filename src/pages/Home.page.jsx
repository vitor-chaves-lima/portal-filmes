import MovieSection from "../components/MovieSection.jsx";
import {useLoaderData} from "react-router-dom";

const HomePage = () => {
    const {upcomingMovies} = useLoaderData()

    return <div>
        <MovieSection icon={"📅"} name={"Upcomming movies"} data={upcomingMovies}/>
    </div>
}

export default HomePage;