import React from 'react';
import styles from '@styles/screens/attract.module.scss';
import { commonAR, commonEN } from '../../content';

const AttractScreen = () => (
  <div className={styles.attract}>
    <div>
      <h1 className='display-3'>{commonAR.attract.title}</h1>
      <h1 className='display-3'>{commonEN.attract.title}</h1>

      <p className='mt-5'>{commonAR.attract.instructions}</p>
      <p>{commonEN.attract.instructions}</p>
    </div>
  </div>
);

export default AttractScreen;
