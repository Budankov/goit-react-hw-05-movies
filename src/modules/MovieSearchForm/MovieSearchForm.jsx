import { useState } from 'react';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import styles from './MovieSearchForm.module.scss';

const MovieSearchForm = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      return Notify.info('Будь ласка, введіть, що шукати!');
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        name="search"
        value={search}
        onChange={handleChange}
        placeholder="Введіть назву фільму для пошуку"
      />
      <button>Пошук</button>
    </form>
  );
};

export default MovieSearchForm;
