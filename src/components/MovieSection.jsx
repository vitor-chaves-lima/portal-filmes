import {Suspense, useEffect, useRef, useState} from "react";
import {Await, Link} from "react-router-dom";
import {buildImageURL} from "../utils/moviedb.js";

const MovieCard = ({ id, poster_path, title, vote_average, vote_count}) => {
    return (
        <Link to={`/explore/movies/${id}`} className={"group flex flex-col min-w-[230px] max-w-[230px]"}>
            <img
                src={buildImageURL(poster_path)}
                alt={`${title}'s poster`}
                className="rounded-lg transition-transform duration-300 group-hover:scale-105 flex-1"
            />
            <div className="mt-4 text-white h-1/6">
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
        <>
            <div className="flex justify-between gap-3">
                <div className="flex items-center gap-5 text-xl text-white">
                    <h2 className="p-2 bg-slate-700/40 rounded-3xl select-none">{icon}</h2>
                    <h2>{name}</h2>
                </div>
            </div>

            <div className="flex items-center justify-center text-white flex-1">
                Loading...
            </div>
        </>
    )
}

const MovieSectionContent = ({icon, name, data}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef(null);

    const handleLeftClick = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }

    const handleRightClick = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, data.length - 1));
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: currentIndex * 246,
                behavior: "smooth"
            });
        }
    }, [currentIndex]);

    return (
        <div className="flex flex-col gap-4">
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
                        disabled={currentIndex >= data.length / 5}
                        className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors 
                               ${currentIndex >= data.length / 5 ? 'border-slate-600 text-slate-600 cursor-not-allowed' : 'bg-transparent border-white text-white hover:bg-white hover:text-gray-800'}`}
                    ><span className="text-lg">{">"}</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-row gap-4 overflow-x-hidden p-2" ref={scrollRef}>
                {data.map(movie => (
                    <MovieCard key={movie.id} {...movie}/>
                ))}
            </div>
        </div>
    )
}

const MovieSection = ({icon, name, data}) => {
    return (
        <section className="py-7">
            <Suspense fallback={<MovieSectionLoading icon={icon} name={name}/>}>
                <Await resolve={data}>
                    {resolvedData => <MovieSectionContent icon={icon} name={name} data={resolvedData}/>}
                </Await>
            </Suspense>
        </section>
    );
};

export default MovieSection;
