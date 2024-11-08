import {Link} from "react-router-dom";
import {buildImageURL} from "../utils/moviedb.js";
import {isFavorite} from "../utils/favorites.js";

const MovieCard = ({ id, poster_path, title, vote_average, vote_count}) => {
    const isMovieFavorite = isFavorite(id);

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
                <div className={"flex items-center gap-2"}>
                    <h2 className="text-lg font-bold">{title}</h2>
                    {isMovieFavorite && "❤"}
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;