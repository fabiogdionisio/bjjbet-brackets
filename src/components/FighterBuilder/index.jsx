import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

function FighterBuilder({ onEdit, disabled }) {
  return (
    <div className={classNames(styles.wrapper)}>
      {!disabled && (
        <>
          <input
            type="text"
            className={styles.input}
            placeholder="Nome do lutador"
            onBlur={onEdit}
            name="name"
            size="sm"
            disabled={disabled}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Equipe do lutador"
            onBlur={onEdit}
            name="team"
            size="sm"
            disabled={disabled}
          />
        </>
      )}
    </div>
  );
}

export default FighterBuilder;
