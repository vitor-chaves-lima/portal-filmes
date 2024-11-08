import MovieCard from './MovieCard';

const MoviesListPaginationComponent = ({currentPage, handleClick}) => {
    const getPageNumbers = () => {
        const pages = [];
        const startPage = currentPage <= 3 ? 1 : currentPage - 3;
        const endPage = currentPage < 4 ? 8 : (currentPage + 4 > 500 ? 500 : currentPage + 4);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="flex w-full justify-center text-3xl py-12 gap-4">
            <button onClick={() => handleClick(1)} disabled={currentPage === 1} className={'disabled:text-slate-600 disabled:cursor-not-allowed text-white'}>
                First
            </button>
            {getPageNumbers().map(page => (
                <button
                    key={page}
                    onClick={() => page !== currentPage && handleClick(page)}
                    className={currentPage === page ? 'text-white border-b border-b-white' : 'text-slate-600' }
                >
                    {page}
                </button>
            ))}
            <button onClick={() => handleClick(500)} disabled={currentPage === 500} className={'disabled:text-slate-600 disabled:cursor-not-allowed text-white'}>
                Last
            </button>
        </div>
    );
}
const MovieList = ({ data }) => {
    return (
        <div className="grid grid-cols-5 gap-x-4 gap-y-12">
            {data.map(movie => (
                <MovieCard key={movie.id} {...movie} />
            ))}
        </div>
    );
};

export {MovieList, MoviesListPaginationComponent};