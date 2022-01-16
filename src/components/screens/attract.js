import React from 'react';
import styles from '@styles/screens/attract.module.scss';
import { commonAR, commonEN } from '../../content';

const AttractScreen = () => (
  <section className={styles.attract}>
    <div>
      <h1 className={styles.titleAR}>{commonAR.attract.title}</h1>
      <h1 className={styles.titleEN}>{commonEN.attract.title}</h1>
    </div>

    <div className={styles.instructions}>
      <span>{commonAR.attract.instructions}</span>
      <span
        dangerouslySetInnerHTML={{ __html: commonEN.attract.instructions }}
      />
    </div>

    <video controls={false} preload='metadata' autoPlay loop>
      <source src={commonAR.attract.video} type='video/mp4' />
    </video>
  </section>
);

export default AttractScreen;
