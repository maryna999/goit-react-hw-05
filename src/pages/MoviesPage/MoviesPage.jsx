import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import { useNavigate, useSearchParams } from "react-router-dom";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === "") return; // Не виконуємо запит, якщо пошуковий запит порожній.

    const fetchMovies = async () => {
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTgyMTE0N2Q3M2Y0MmQ1ZjIyZTdlNmFiZTlkOGZhYyIsIm5iZiI6MTcyNzQ1OTMyMy4wMzAzMjQsInN1YiI6IjY2ZjY5YWMyNTRkYTQyNDYxZjcwYzAzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cW7MagY4f-0oSbl_i172KEAPA7TUmf91G5Yvp12F5V4",
            },
          }
        );

        if (response.data.results.length === 0) {
          navigate("/404");
        } else {
          setMovies(response.data.results);
        }
      } catch (error) {
        setError("Something went wrong. Please try again later.");
      }
    };

    fetchMovies();
  }, [query, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      navigate("/404");
      return;
    }

    setSearchParams({ query });
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`, { state: { from: "/movies" } });
  };

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSearch}>
        <input
          className={s.input}
          type="text"
          value={query}
          onChange={(e) => setSearchParams({ query: e.target.value })}
          placeholder="Search movies..."
        />
        <button className={s.btn} type="submit">
          Search
        </button>
      </form>
      {error && <p>{error}</p>}
      <MovieList movies={movies} onMovieClick={handleMovieClick} />
    </div>
  );
};

export default MoviesPage;
