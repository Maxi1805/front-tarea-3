function MovieCard({ movie, setSelectedMovie, selectedMovie }) {
    const handleClick = () => {
        if (selectedMovie?.id === movie.id) {
            setSelectedMovie(null);
            return;
        }
        setSelectedMovie(movie);
    };

    const handleSelected = () => {
        if (selectedMovie?.id === movie.id) {
            return 'border-2 border-blue-500';
        }
        return '';
    };

    return (
        <div className={`bg-white rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition duration-300 cursor-pointer border ${handleSelected()}`} onClick={handleClick}>
            <img className="w-full h-48 object-cover" src={movie.image} alt={movie.title} />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-black">{movie.title}</h2>
            </div>
        </div>
    );
}

export default MovieCard;
