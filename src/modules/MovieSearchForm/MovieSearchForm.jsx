import { useState } from 'react';

const MovieSearchForm = ({ onSubmit }) => {
  const [state, setState] = useState({
    search: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({
      search: '',
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="search"
        value={state.search}
        onChange={handleChange}
        placeholder="Введіть назву фільму для пошуку"
        required
      />
      <button>Пошук</button>
    </form>
  );
};

export default MovieSearchForm;
