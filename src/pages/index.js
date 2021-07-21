import React from 'react';
import Home from '@components/Home';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout';

const IndexPage = () => {
  const { t, i18n } = useTranslation();

  function changeLang() {
    if (i18n.language === 'ar') i18n.changeLanguage('en');
    else i18n.changeLanguage('ar');
  }

  return (
    <Layout>
      <Home />

      <Container>
        <h1>{t('attract.title')}</h1>
        <button type='button' onClick={changeLang}>
          Change lang
        </button>
      </Container>
    </Layout>
  );
};

export default IndexPage;
