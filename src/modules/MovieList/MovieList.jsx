import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchTrendingFilms } from 'shared/api/themoviedb';

const MovieList = () => {
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
            items: [...prevState.items, ...data.results],
          };
        });
      } catch (error) {
        setState({
          ...state,
          error,
        });
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
  }, [setState]);

  const { items, loading, error } = state;

  const elements = items.map(({ id, title }, index) => (
    <li key={index}>
      <Link to={`/movie/${id}`}>{title}</Link>
    </li>
  ));

  return (
    <div>
      <ul>{elements}</ul>
      {loading && <p>...Load movie</p>}
      {error && <p>...Movie load failed</p>}
    </div>
  );
};

export default MovieList;
