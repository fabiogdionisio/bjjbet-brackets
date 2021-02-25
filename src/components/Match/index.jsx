import React from 'react';
import classNames from 'classnames';

import Fighter from '../Fighter';

import styles from './styles.module.scss';

function Match({ order, upperFighter, lowerFighter, winner, nextMatch }) {
  return (
    <li className={classNames({ [styles.fought]: winner })}>
      <div className={styles.wrapper}>
        <div
          className={classNames(styles.order, {
            [styles.winner]: winner,
            [styles.nextMatch]: nextMatch,
          })}
        >
          <span>{order}</span>
        </div>

        <Fighter
          winner={upperFighter && winner === upperFighter.id}
          loser={winner && winner !== upperFighter.id}
          nextMatch={nextMatch}
          {...upperFighter}
        />
        <Fighter
          winner={lowerFighter && winner === lowerFighter.id}
          loser={
            (winner && winner !== lowerFighter?.id) || lowerFighter === null
          }
          nextMatch={nextMatch}
          {...lowerFighter}
        />
      </div>
    </li>
  );
}

export default Match;
