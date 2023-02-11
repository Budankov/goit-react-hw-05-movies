import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { fetchFilmToId } from 'shared/api/themoviedb';

import styles from './MovieDetails.module.scss';

const MovieDetails = () => {
  const [state, setState] = useState({
    item: {},
    loading: false,
    error: null,
  });

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

  const ganresList = genres?.map(ganre => ganre.name).join(', ');

  const userScore = () => {
    const scorePecentage = () => {
      return Math.round(vote_average * 10);
    };
    const userScorePecentage = scorePecentage();

    return (
      <p className={styles.MovieDetailsUserScore}>
        Оцінка користувачів:&ensp;
        {userScorePecentage}% ({vote_count})
      </p>
    );
  };

  const Score = userScore();

  return (
    <>
      <button className={styles.goBack} onClick={goBack}>
        Повернутись на попередню сторінку
      </button>
      <div className={styles.MovieDetailsContainer}>
        <div className={styles.MovieDetailsImage}>
          <img
            src={
              poster_path === null
                ? 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
                : `https://image.tmdb.org/t/p/w500${poster_path}`
            }
            alt=""
          ></img>
        </div>
        <div className={styles.MovieDetailsDescription}>
          <h2 className={styles.MovieDetailsTitle}>{title}</h2>
          {vote_average > 0 && Score}
          <p className={styles.MovieDetailsSubTitle}>Короткий опис</p>
          <p>{overview !== '' ? overview : 'Опис не вказано'}</p>
          <p className={styles.MovieDetailsSubTitle}>Жанри</p>
          <p>{ganresList !== '' ? ganresList : 'Жанри не вказано'}</p>
        </div>
      </div>
      <div>
        <p>Додаткова інформація</p>
        <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
      </div>
    </>
  );
};

export default MovieDetails;
