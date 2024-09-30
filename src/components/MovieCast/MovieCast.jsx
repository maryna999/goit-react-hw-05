import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTgyMTE0N2Q3M2Y0MmQ1ZjIyZTdlNmFiZTlkOGZhYyIsIm5iZiI6MTcyNzQ1OTMyMy4wMzAzMjQsInN1YiI6IjY2ZjY5YWMyNTRkYTQyNDYxZjcwYzAzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cW7MagY4f-0oSbl_i172KEAPA7TUmf91G5Yvp12F5V4",
            },
          }
        );
        const filteredCast = response.data.cast
          .filter((actor) => actor.profile_path)
          .slice(0, 20);
        setCast(filteredCast);
      } catch (error) {
        console.error(
          "Failed to fetch cast:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (!cast.length) return <p>No cast information available</p>;

  return (
    <div>
      <h2 className={s.title}>Cast</h2>
      <ul className={s.cast}>
        {cast.map(({ id, name, character, profile_path }) => (
          <li className={s.item} key={id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              alt={name}
            />
            <div>
              <p className={s.subtitle}>
                &#8226; <b>Name:</b> {name}
              </p>
              <p className={s.subtitle}>
                &#8226; <b>Character:</b> {character}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
