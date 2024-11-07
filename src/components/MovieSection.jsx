import {Suspense, useState} from "react";
import {Await, Link} from "react-router-dom";
import {buildImageURL} from "../utils/moviedb.js";

const MovieCard = ({ id, poster_path, title, vote_average, vote_count}) => {
    return (
        <Link to={`/explore/movies/${id}`} className={"group"}>
            <img
                src={buildImageURL(poster_path)}
                alt={`${title}'s poster`}
                className="rounded-lg w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
            />
            <div className="mt-4 text-white">
                <div className="flex text-sm mb-1 gap-2">
                    <span className="flex gap-2">
                        <span>★</span>
                        <span>{vote_average.toFixed(1)}</span>
                    </span>
                    <span>• {vote_count > 1 ? `${vote_count} reviews` : `${vote_count} review`}</span>
                </div>
                <h2 className="text-lg font-bold">{title}</h2>
            </div>
        </Link>
    );
};

const MovieSectionLoading = ({icon, name}) => {
    return (
        <section className="flex flex-col py-7 gap-7">
            <div className="flex justify-between gap-3">
                <div className="flex items-center gap-5 text-xl text-white">
                    <h2 className="p-2 bg-slate-700/40 rounded-3xl select-none">{icon}</h2>
                    <h2>{name}</h2>
                </div>
            </div>

            <div className="flex items-center justify-center text-white">
                Loading...
            </div>
        </section>
    )
}

const MovieSectionContent = ({icon, name, data}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const itemsVisible = 6;
    const maxIndex = Math.ceil(data.length / itemsVisible) - 1;

    const handleLeftClick = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const handleRightClick = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, maxIndex));
    };

    const startIndex = currentIndex * itemsVisible;
    const visibleMovies = data.slice(startIndex, startIndex + itemsVisible);

    return (
        <section className="flex flex-col py-7 gap-7">
            <div className="flex justify-between gap-3">
                <div className="flex items-center gap-5 text-xl text-white">
                    <h2 className="p-2 bg-slate-700/40 rounded-3xl select-none">{icon}</h2>
                    <h2>{name}</h2>
                </div>

                <div className="flex items-center gap-5 text-slate-500 text-xl select-none">
                    <button
                        onClick={handleLeftClick}
                        disabled={currentIndex === 0}
                        className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors 
                            ${currentIndex === 0 ? 'border-slate-600 text-slate-600 cursor-not-allowed' : 'bg-transparent border-white text-white hover:bg-white hover:text-gray-800'}`}
                    >
                        <span className="text-lg">{"<"}</span>
                    </button>

                    <button
                        onClick={handleRightClick}
                        disabled={currentIndex >= maxIndex}
                        className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors 
                            ${currentIndex >= maxIndex ? 'border-slate-600 text-slate-600 cursor-not-allowed' : 'bg-transparent border-white text-white hover:bg-white hover:text-gray-800'}`}
                    >
                    <span className="text-lg">{">"}</span>
                    </button>
                </div>
            </div>

            <div className="overflow-hidden">
                <div className="flex transition-transform duration-300 gap-8 py-5 px-2"
                     style={{ transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)` }}
                >
                    {visibleMovies.map((movie, index) => (
                        <MovieCard key={startIndex + index} {...movie} />
                    ))}
                </div>
            </div>
        </section>
    )
}

const MovieSection = ({ icon, name, data }) => {
    return (
        <section className="flex flex-col py-7 gap-7">
            <Suspense
                fallback={<MovieSectionLoading icon={icon} name={name} />}
            >
                <Await
                    resolve={data}
                >
                    {resolvedData => <MovieSectionContent icon={icon} name={name} data={resolvedData}/>}
                </Await>
            </Suspense>
        </section>
    );
};

export default MovieSection;
