import Navbar from 'modules/Navbar/Navbar';
import UserRoutes from './UserRoutes';

import './shared/styles/styles.scss';

export const App = () => {
  return (
    <>
      <Navbar />
      <UserRoutes />
    </>
  );
};
