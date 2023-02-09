import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchFilmToId } from 'shared/api/themoviedb';

const MovieDetails = () => {
  const [state, setState] = useState({
    item: {},
    loading: false,
    error: null,
  });

  // const params = useParams();
  // console.log(params);

  const { id } = useParams();

  useEffect(() => {
    const getTrandingMovie = async () => {
      setState(prevState => ({
        ...prevState,
        loading: true,
        error: null,
      }));

      try {
        const { data } = await fetchFilmToId(id);
        setState(prevState => {
          return {
            ...prevState,
            item: [...prevState.item, ...data.results],
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

  const { title } = state.item;
  console.log(title);

  return (
    <>
      <h2>{title}</h2>
    </>
  );
};

export default MovieDetails;
