import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

function FighterBuilder({
  id,
  name,
  team,
  onEdit,
  disabled,
  winner,
  loser,
  firstRound,
}) {
  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.winner]: winner,
        [styles.loser]: loser,
      })}
    >
      {firstRound ? (
        <>
          <input
            type="text"
            className={styles.input}
            placeholder="Nome do lutador"
            onBlur={onEdit}
            name="name"
            disabled={disabled}
            defaultValue={name}
          />
          {id !== 0 && (
            <input
              type="text"
              className={styles.input}
              placeholder="Equipe do lutador"
              onBlur={onEdit}
              name="team"
              disabled={disabled}
              defaultValue={team}
            />
          )}
        </>
      ) : (
        <>
          <input
            type="text"
            className={styles.input}
            placeholder="Nome do lutador"
            onBlur={onEdit}
            name="name"
            disabled={disabled}
            value={name}
          />
          {id !== 0 && (
            <input
              type="text"
              className={styles.input}
              placeholder="Equipe do lutador"
              onBlur={onEdit}
              name="team"
              disabled={disabled}
              value={team}
            />
          )}
        </>
      )}
    </div>
  );
}

export default FighterBuilder;
