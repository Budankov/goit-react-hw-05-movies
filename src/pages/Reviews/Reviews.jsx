import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchReviewsFilmToId } from 'shared/api/themoviedb';

import Loader from 'shared/components/Loader/Loader';

import styles from './Reviews.module.scss';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    const getReviewsMovie = async () => {
      setIsLoading(true);
      try {
        const { data } = await fetchReviewsFilmToId(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(error.massage);
      } finally {
        setIsLoading(false);
      }
    };
    getReviewsMovie(movieId);
  }, [movieId]);

  const renderReviewsList = reviews?.map(
    ({ id, author, content, created_at }) => {
      return (
        <li key={id} className={styles.reviewsItem}>
          <div>
            <h4 className={styles.reviewsAuthorName}>Автор: {author}</h4>

            <p>{content}</p>
            <p>Дата публікації: {created_at}</p>
          </div>
        </li>
      );
    }
  );

  return (
    <div>
      <h3 className={styles.reviewsTitle}>Відгуки</h3>
      {loading && <Loader />}
      {error && <p>{error.massage}</p>}
      <ul className={styles.reviewsList}>{renderReviewsList}</ul>
    </div>
  );
};

export default Reviews;
