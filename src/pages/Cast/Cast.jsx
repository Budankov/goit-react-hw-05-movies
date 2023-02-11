import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchCastFilmToId } from 'shared/api/themoviedb';

import styles from './Cast.module.scss';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    const getCastMovie = async () => {
      setIsLoading(true);
      try {
        const { data } = await fetchCastFilmToId(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(error.massage);
      } finally {
        setIsLoading(false);
      }
    };
    getCastMovie(movieId);
  }, [movieId]);

  const renderCastList = cast?.map(
    ({ cast_id, name, character, profile_path }) => {
      return (
        <li key={cast_id} className={styles.castItem}>
          <div>
            <img
              src={
                profile_path === null
                  ? 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
                  : `https://image.tmdb.org/t/p/w500${profile_path}`
              }
              alt=""
              className={styles.castActorImage}
            />
          </div>
          <div className={styles.castActorInfo}>
            <div className={styles.castActorName}>{name}</div>
            <div className={styles.castActorCharacter}>
              Персонаж: {character}
            </div>
          </div>
        </li>
      );
    }
  );

  return (
    <div>
      <h3 className={styles.castTitle}>Акторський склад</h3>
      {isLoading && <p>Завантажую...</p>}
      {error && <p>{error.massage}</p>}
      <ul className={styles.castList}>{renderCastList}</ul>
    </div>
  );
};

export default Cast;
