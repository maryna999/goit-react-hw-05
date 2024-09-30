import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import { useNavigate } from "react-router-dom";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTgyMTE0N2Q3M2Y0MmQ1ZjIyZTdlNmFiZTlkOGZhYyIsIm5iZiI6MTcyNzQ1OTMyMy4wMzAzMjQsInN1YiI6IjY2ZjY5YWMyNTRkYTQyNDYxZjcwYzAzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cW7MagY4f-0oSbl_i172KEAPA7TUmf91G5Yvp12F5V4",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`, { state: { from: "/" } });
  };

  return (
    <div className={s.home}>
      <h1 className={s.title}>Trending Movies Today</h1>
      <MovieList movies={movies} onMovieClick={handleMovieClick} />
    </div>
  );
};

export default HomePage;
