import React from 'react';
import classNames from 'classnames';

import FighterBuilder from '../FighterBuilder';

import styles from './styles.module.scss';

function MatchBuilder({
  order,
  upperFighter,
  lowerFighter,
  winner,
  nextMatch,
  disabled,
}) {
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

        <FighterBuilder disabled={disabled} {...upperFighter} />
        <FighterBuilder disabled={disabled} {...lowerFighter} />
      </div>
    </li>
  );
}

export default MatchBuilder;
