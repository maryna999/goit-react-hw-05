import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import s from "./MovieList.module.css";

const MovieList = ({ movies, onMovieClick }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searched, setSearched] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (movies.length) {
      const moviesWithPosters = movies.filter((movie) => movie.poster_path);
      setFilteredMovies(moviesWithPosters);
      setSearched(true);
    }
  }, [movies]);

  if (searched && !filteredMovies.length) return <p>No movies found</p>;

  return (
    <ul className={s.list}>
      {filteredMovies.map(({ id, title, poster_path }) => (
        <li className={s.item} key={id}>
          <Link
            to={`/movies/${id}`}
            onClick={() => onMovieClick(id)}
            state={{ from: location }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${poster_path}`}
              alt={title}
            />
            <p className={s.title}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
