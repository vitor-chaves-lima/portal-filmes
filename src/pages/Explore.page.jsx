import {Await, Link, useLoaderData} from "react-router-dom";
import {Suspense} from "react";

const GenreLink = ({id, name}) => {
    return  <Link to={`/explore/genres/${id}`} className="flex p-4 rounded border transition-colors bg-transparent border-white text-white hover:bg-white hover:text-gray-800">
        {name}
    </Link>
}

const ExplorePageLoading = () => {
    return <h2 className={"text-white"}>Loading...</h2>
}

const ExplorePage = () => {
    const {moviesGenres} = useLoaderData()

    return <div className={"flex flex-col py-12"}>
        <h1 className="text-3xl text-white">Select one genre</h1>

        <div className={"py-10 flex gap-4 flex-wrap justify-center px-10"}>
            <Suspense fallback={<ExplorePageLoading />}>
                <Await resolve={moviesGenres}>
                    {resolvedData => resolvedData.map(genre => <GenreLink key={genre.id} {...genre}/>)}
                </Await>
            </Suspense>
        </div>
    </div>
}

export default ExplorePage;