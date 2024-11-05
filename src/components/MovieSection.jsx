import { useState } from "react";

// Componente MovieCard
const MovieCard = ({ imageData }) => {
    return (
        <div className="px-4">
            <img
                src={imageData.src}
                alt={imageData.alt}
                className="rounded-lg w-full object-cover"
            />
            <div className="mt-4 text-white">
                <div className="flex text-sm mb-1 gap-2">
                    <span className="flex gap-2">
                        <span>★</span>
                        <span>4.8</span>
                    </span>
                    <span>• 12 reviews</span>
                </div>
                <h2 className="text-lg font-bold">The Batman</h2>
            </div>
        </div>
    );
};

// Componente MovieSection
const MovieSection = ({ icon, name }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const movieData = [
        {
            src: "https://image.tmdb.org/t/p/original/k42Owka8v91trK1qMYwCQCNwJKr.jpg",
            alt: "Venom: The Last Dance"
        },
        {
            src: "https://image.tmdb.org/t/p/original/k42Owka8v91trK1qMYwCQCNwJKr.jpg",
            alt: "Spider-Man: No Way Home"
        },
        {
            src: "https://image.tmdb.org/t/p/original/k42Owka8v91trK1qMYwCQCNwJKr.jpg",
            alt: "The Batman"
        },
        {
            src: "https://image.tmdb.org/t/p/original/k42Owka8v91trK1qMYwCQCNwJKr.jpg",
            alt: "Venom: The Last Dance"
        },
        {
            src: "https://image.tmdb.org/t/p/original/k42Owka8v91trK1qMYwCQCNwJKr.jpg",
            alt: "Spider-Man: No Way Home"
        },
        {
            src: "https://image.tmdb.org/t/p/original/k42Owka8v91trK1qMYwCQCNwJKr.jpg",
            alt: "The Batman"
        },
        {
            src: "https://image.tmdb.org/t/p/original/k42Owka8v91trK1qMYwCQCNwJKr.jpg",
            alt: "Venom: The Last Dance"
        }
    ];

    const itemsVisible = 6;
    const maxIndex = Math.ceil(movieData.length / itemsVisible) - 1;

    const handleLeftClick = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const handleRightClick = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, maxIndex));
    };

    // Calcular os filmes a serem exibidos
    const startIndex = currentIndex * itemsVisible;
    const visibleMovies = movieData.slice(startIndex, startIndex + itemsVisible);

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
                <div className="flex transition-transform duration-300"
                     style={{ transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)` }}
                >
                    {visibleMovies.map((movie, index) => (
                        <MovieCard key={startIndex + index} imageData={movie} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MovieSection;
