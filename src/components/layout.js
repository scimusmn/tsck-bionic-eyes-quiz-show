import React from 'react';
import PropTypes from 'prop-types';
import { useSSR } from 'react-i18next';
import i18n from '../i18n';
// import { commonAR, commonEN, quizAR, quizEN } from '../content';

const Layout = ({ children }) => {
  const defaultStore = i18n.store.data;
  const defaultLang = i18n.language;
  useSSR(defaultStore, defaultLang);

  return <>{children}</>;
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
