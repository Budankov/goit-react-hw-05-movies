import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { fetchFilmToId } from 'shared/api/themoviedb';

import styles from './MovieDetails.module.scss';

const MovieDetails = () => {
  const [state, setState] = useState({
    item: {},
    loading: false,
    error: null,
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { movieId } = useParams();

  useEffect(() => {
    const getTrandingMovie = async () => {
      setState(prevState => ({
        ...prevState,
        loading: true,
        error: null,
      }));

      try {
        const { data } = await fetchFilmToId(movieId);
        setState(prevState => {
          return {
            ...prevState,
            item: data,
          };
        });
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          error,
        }));
      } finally {
        setState(prevState => {
          return {
            ...prevState,
            loading: false,
          };
        });
      }
    };
    getTrandingMovie(movieId);
  }, [movieId]);

  const { title, poster_path, overview, genres, vote_average, vote_count } =
    state.item;
  // console.log(genres);

  const goBack = () => navigate(-1);

  const imageUrl = `https://image.tmdb.org/t/p/w300${poster_path}`;
  const userScorePecentage = () => {
    return Math.round(vote_average * 10);
  };
  const userScore = userScorePecentage();
  const ganresList = genres?.map(ganre => ganre.name).join(', ');

  return (
    <>
      <button onClick={goBack}>Повернутись на попередню сторінку</button>
      <div className={styles.MovieDetailsContainer}>
        <div className={styles.MovieDetailsImage}>
          <img src={imageUrl} alt=""></img>
        </div>
        <div className={styles.MovieDetailsDescription}>
          <h2 className={styles.MovieDetailsTitle}>{title}</h2>
          <p className={styles.MovieDetailsUserScore}>
            Оцінка користувачів:&ensp;
            {userScore !== '' ? userScore : 'Оцінка не вказана'}% (
            {vote_count !== ''
              ? vote_count
              : 'Кількість користувачів не вказана'}
            )
          </p>
          <p className={styles.MovieDetailsSubTitle}>Короткий опис</p>
          <p>{overview !== '' ? overview : 'Опис не вказано'}</p>
          <p className={styles.MovieDetailsSubTitle}>Жанри</p>
          <p>{ganresList !== '' ? ganresList : 'Жанри не вказано'}</p>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
