import React from 'react';
import Home from '@components/Home';
import { Attract, Introduction, Quiz, Score } from '../content';

const IndexPage = () => (
  <>
    <Home />

    <div className='p-4'>
      <pre>{JSON.stringify(Attract, null, 4)}</pre>
      <pre>{JSON.stringify(Introduction, null, 4)}</pre>
      <pre>{JSON.stringify(Quiz, null, 4)}</pre>
      <pre>{JSON.stringify(Score, null, 4)}</pre>
    </div>
  </>
);

export default IndexPage;
