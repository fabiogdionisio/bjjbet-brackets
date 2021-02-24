import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

function Round({ position, children, isSemiFinal }) {
  if (position === 'left')
    return (
      <ul
        className={classNames(styles.round, styles.roundLeft, {
          [styles.semiFinal]: isSemiFinal,
        })}
      >
        {children}
      </ul>
    );
  if (position === 'right')
    return (
      <ul
        className={classNames(styles.round, styles.roundRight, {
          [styles.semiFinal]: isSemiFinal,
        })}
      >
        {children}
      </ul>
    );
  return (
    <ul className={classNames(styles.round, styles.roundFinal)}>{children}</ul>
  );
}

export default Round;
