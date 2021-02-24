import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

function Fighter({ loser, name, team, winner, nextMatch }) {
  return (
    <div
      className={classNames(styles.fighter, styles.upperFighter, {
        [styles.winner]: winner,
        [styles.loser]: loser,
        [styles.nextMatch]: nextMatch,
      })}
    >
      <span className={styles.name}>{name}</span>
      <span className={styles.team}>{team}</span>
    </div>
  );
}

export default Fighter;
