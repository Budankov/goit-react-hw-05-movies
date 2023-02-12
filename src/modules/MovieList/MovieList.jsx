import { Link, useLocation } from 'react-router-dom';

import Loader from 'shared/components/Loader/Loader';

const MovieList = ({ items, loading, error }) => {
  const location = useLocation();

  const elements = items.map(({ id, title, name }) => (
    <li key={id}>
      <Link state={{ from: location }} to={`/movies/${id}`}>
        {title || name}
      </Link>
    </li>
  ));

  return (
    <div>
      <ul>{elements}</ul>
      {loading && <Loader />}
      {error && <p>...Movie load failed</p>}
    </div>
  );
};

export default MovieList;

MovieList.defaultPorps = {
  items: [],
};
