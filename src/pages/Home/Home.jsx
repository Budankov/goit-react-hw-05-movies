import { useState, useEffect } from 'react';

import { fetchTrendingFilms } from 'shared/api/themoviedb';

import MovieList from 'modules/MovieList/MovieList';

const Home = () => {
  const [state, setState] = useState({
    items: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    const getTrandingMovie = async () => {
      setState(prevState => ({
        ...prevState,
        loading: true,
        error: null,
      }));

      try {
        const { data } = await fetchTrendingFilms();
        setState(prevState => {
          return {
            ...prevState,
            items: [...data.results],
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
    getTrandingMovie();
  }, []);

  const { items, loading, error } = state;

  return (
    <div>
      <h2>Tranding today</h2>
      {items.length > 0 && (
        <MovieList items={items} loading={loading} error={error} />
      )}
    </div>
  );
};

export default Home;
