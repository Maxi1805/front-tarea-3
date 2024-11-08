import MovieCard from './MovieCard';

const movies = [
  {
    id: 1,
    title: 'Logan',
    image: '/Logan.webp',
    script: 'script_Logan.txt',
  },
  {
    id: 2,
    title: 'Megamind',
    image: '/Megamente.webp',
    script: 'script_Megamind.txt',
  },
  {
    id: 3,
    title: 'Mulan',
    image: '/Mulan.webp',
    script: 'script_Mulan.txt',
  },
  {
    id: 4,
    title: 'Pokemon: Mewtwo Returns',
    image: '/Pokemon.webp',
    script: 'script_Pokemon: Mewtwo Returns.txt',
  },
  {
    id: 5,
    title: 'Star Wars: A New Hope',
    image: '/StarWarsNewHope.webp',
    script: 'script_Star Wars: A New Hope.txt',
  },
  {
    id: 6,
    title: 'Star Wars: Attack of the Clones',
    image: '/CloneWars.jpg',
    script: 'script_Star Wars: Attack of the Clones.txt',
  },
  {
    id: 7,
    title: 'Star Wars: The Empire Strikes Back',
    image: '/StrikeBack.webp',
    script: 'script_Star Wars: The Empire Strikes Back.txt',
  },
  {
    id: 8,
    title: 'Star Wars: The Force Awakens',
    image: '/ForceAwakens.webp',
    script: 'script_Star Wars: The Force Awakens.txt',
  },
  {
    id: 9,
    title: 'Star Wars: The Phantom Menace',
    image: '/AmenazaFantasma.webp',
    script: 'script_Star Wars: The Phantom Menace.txt',
  },
  {
    id: 10,
    title: 'Toy Story',
    image: '/ToyStory.webp',
    script: 'script_Toy Story.txt',
  },
  {
    id: 11,
    title: 'Jurassic Park',
    image: '/JurassicPark.webp',
    script: 'script_Jurassic Park.txt',
  },
  {
    id: 12,
    title: 'Jurassic Park III',
    image: '/JurassicPark3.webp',
    script: 'script_Jurassic Park III.txt',
  },
  {
    id: 13,
    title: 'Jurassic Park: The Lost World',
    image: '/JurassicPark2.webp',
    script: 'script_Jurassic Park: The Lost World.txt',
  },
];

function MovieList({selectedMovie, setSelectedMovie}) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} setSelectedMovie={setSelectedMovie} selectedMovie={selectedMovie} />
          ))}
        </div>
      </div>
    );
}

export default MovieList;
