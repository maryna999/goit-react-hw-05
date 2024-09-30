import {
  useParams,
  Outlet,
  Link,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const prevLocationRef = useRef(location.state?.from || "/movies"); //

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTgyMTE0N2Q3M2Y0MmQ1ZjIyZTdlNmFiZTlkOGZhYyIsIm5iZiI6MTcyNzQ1OTMyMy4wMzAzMjQsInN1YiI6IjY2ZjY5YWMyNTRkYTQyNDYxZjcwYzAzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cW7MagY4f-0oSbl_i172KEAPA7TUmf91G5Yvp12F5V4",
            },
          }
        );
        setMovie(response.data);
      } catch (err) {
        setError(true);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(prevLocationRef.current);
  };

  if (error) {
    return <Navigate to="/404" />;
  }

  if (!movie) return null;

  return (
    <div className={s.details}>
      <button className={s.btn} onClick={handleGoBack}>
        Go back
      </button>
      <h1 className={s.title}>
        {movie.title} ({movie.release_date.split("-")[0]})
      </h1>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={s.overview}>
          <p>User score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <div className={s.nav}>
        <h2 className={s.info}>Additional information</h2>
        <nav>
          <Link
            className={s.link}
            to="cast"
            state={{ from: prevLocationRef.current }}
          >
            {" "}
            Cast
          </Link>
          <Link
            className={s.link}
            to="reviews"
            state={{ from: prevLocationRef.current }}
          >
            {" "}
            Reviews
          </Link>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
