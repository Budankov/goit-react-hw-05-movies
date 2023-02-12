import { useState, useEffect } from 'react';

import { fetchTrendingFilms } from 'shared/api/themoviedb';

import MovieList from 'modules/MovieList/MovieList';
import Loader from 'shared/components/Loader/Loader';

import styles from './Home.module.scss';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrandingMovie = async () => {
      try {
        setLoading(true);
        const { data } = await fetchTrendingFilms();
        setItems(data.results);
      } catch (error) {
        setError(error.massage);
      } finally {
        setLoading(false);
      }
    };
    getTrandingMovie();
  }, []);

  return (
    <div>
      <h2 className={styles.title}>У тренді сьогодні</h2>
      {loading && <Loader />}
      {error && <p>{error.massage}</p>}
      {items.length > 0 && (
        <MovieList items={items} loading={loading} error={error} />
      )}
    </div>
  );
};

export default Home;
