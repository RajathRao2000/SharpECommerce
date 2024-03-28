import { Fragment } from 'react';
// import ContextProvider from '../context/ContextProvider';
import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
