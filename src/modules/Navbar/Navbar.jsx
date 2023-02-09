import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.scss';

const getClassName = ({ isActive }) => {
  const className = isActive ? `${styles.link} ${styles.active}` : styles.link;
  return className;
};

const Navbar = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.navbar}>
        <NavLink className={getClassName} to="/">
          Home
        </NavLink>
        <NavLink className={getClassName} to="/movies">
          Movies
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
