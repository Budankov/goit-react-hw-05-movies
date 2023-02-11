import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchSearchFilms } from 'shared/api/themoviedb';

import MovieSearchForm from 'modules/MovieSearchForm/MovieSearchForm';
import MovieList from 'modules/MovieList/MovieList';

const Movies = () => {
  const [state, setState] = useState({
    items: [],
    loading: false,
    error: null,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setState(prevState => ({
          ...prevState,
          loading: true,
        }));

        const { data } = await fetchSearchFilms(search);

        setState(prevState => ({
          ...prevState,
          items: [...data.results],
        }));
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          error,
        }));
      } finally {
        setState(prevState => ({
          ...prevState,
          loading: false,
        }));
      }
    };

    if (search) {
      fetchMovie();
    }
  }, [search]);

  const changeSearch = ({ search }) => {
    setSearchParams({ search });
  };
  const { items } = state;

  return (
    <div>
      <h2>Пошук фільма</h2>
      <MovieSearchForm onSubmit={changeSearch} />
      {items.length > 0 && <MovieList items={items} />}
    </div>
  );
};

export default Movies;
