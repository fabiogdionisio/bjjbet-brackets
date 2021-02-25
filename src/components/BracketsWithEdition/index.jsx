import React from 'react';

import Round from '../Round';
import MatchBuilder from '../MatchBuilder/index';

import styles from './styles.module.scss';

function BracketsWithEdition() {
  return (
    <div className={styles.wrapper}>
      <Round position="left">
        <MatchBuilder />
        <MatchBuilder />
        <MatchBuilder />
        <MatchBuilder />
      </Round>
      <Round position="left">
        <MatchBuilder disabled />
        <MatchBuilder disabled />
      </Round>
      <Round position="left" isSemiFinal>
        <MatchBuilder disabled />
      </Round>
      <Round>
        <MatchBuilder disabled />
      </Round>
      <Round position="right" isSemiFinal>
        <MatchBuilder disabled />
      </Round>
      <Round position="right">
        <MatchBuilder disabled />
        <MatchBuilder disabled />
      </Round>
      <Round position="right">
        <MatchBuilder />
        <MatchBuilder />
        <MatchBuilder />
        <MatchBuilder />
      </Round>
    </div>
  );
}

export default BracketsWithEdition;
