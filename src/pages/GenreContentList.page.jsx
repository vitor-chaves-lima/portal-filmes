import {Await, useLoaderData, useLocation, useNavigate} from "react-router-dom";
import {Suspense} from "react";
import {MovieList, MoviesListPaginationComponent} from "../components/MovieList.jsx";

const GenreContentListLoading = () => {
    return <h2 className={"text-white"}>Loading...</h2>
}

const GenreContentListPage = () => {
    const {data, genreName} = useLoaderData();
    const navigate = useNavigate();

    const handlePagination = (page) => {
        navigate(`?page=${page}`);
    }

    return (
        <div className={"flex flex-col gap-10 py-12"}>
            <h1 className="text-3xl text-white">{genreName} movies</h1>

            <Suspense fallback={<GenreContentListLoading/>}>
                <Await resolve={data}>
                    {resolvedData => (
                        <div>
                            <MovieList data={resolvedData["results"]} />
                            <MoviesListPaginationComponent currentPage={resolvedData["page"]} maxPages={resolvedData["total_pages"]} handleClick={handlePagination} />
                        </div>
                    )}
                </Await>
            </Suspense>
        </div>
    );
}

export default GenreContentListPage;