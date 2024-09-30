import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTgyMTE0N2Q3M2Y0MmQ1ZjIyZTdlNmFiZTlkOGZhYyIsIm5iZiI6MTcyNzQ1OTMyMy4wMzAzMjQsInN1YiI6IjY2ZjY5YWMyNTRkYTQyNDYxZjcwYzAzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cW7MagY4f-0oSbl_i172KEAPA7TUmf91G5Yvp12F5V4",
            },
          }
        );
        const limitedReviews = response.data.results.slice(0, 2);
        setReviews(limitedReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!reviews.length) {
    return <p>No reviews available</p>;
  }

  return (
    <div className={s.reviews}>
      <h2>Reviews</h2>
      <ul className={s.list}>
        {reviews.map(({ id, author, content }) => (
          <li key={id}>
            <h3>Author: {author}</h3>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
