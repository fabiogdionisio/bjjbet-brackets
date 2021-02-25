import React from 'react';
import classNames from 'classnames';
import { FaRedo, FaCheck } from 'react-icons/fa';

import FighterBuilder from '../FighterBuilder';

import styles from './styles.module.scss';

function MatchBuilder({
  id,
  upperFighter,
  lowerFighter,
  winner,
  nextMatch,
  disabled,
  firstRound,
  order,
  onEdit,
  onSelectNextMatch,
  onEditOrder,
  advanceTeam,
  redoMatch,
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
          <input
            type="number"
            name="order"
            placeholder="Ordem"
            min="1"
            max="15"
            defaultValue={order}
            onBlur={(e) => onEditOrder(e, id)}
          />
          <div>
            <label htmlFor={`nextMatch-${id}`}>
              Próx. Luta
              <input
                type="radio"
                name="nextMatch"
                id={`nextMatch-${id}`}
                className="ml-2"
                checked={nextMatch}
                onChange={onSelectNextMatch}
                value={id}
              />
            </label>
          </div>
        </div>

        {upperFighter?.id !== 0 && lowerFighter?.id !== 0 && !winner && (
          <div className={styles.foward}>
            <button
              type="button"
              tabIndex={-1}
              onClick={() => advanceTeam(id, upperFighter.id, 'upperFighter')}
            >
              <FaCheck size="14" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              onClick={() => advanceTeam(id, lowerFighter.id, 'lowerFighter')}
            >
              <FaCheck size="14" />
            </button>
          </div>
        )}

        {(upperFighter?.id !== 0 || lowerFighter?.id !== 0) && !firstRound && (
          <div className={styles.backward}>
            <button type="button" tabIndex={-1} onClick={() => redoMatch(id)}>
              <FaRedo size="14" />
            </button>
          </div>
        )}

        <FighterBuilder
          disabled={disabled || winner}
          winner={upperFighter && winner === upperFighter.id}
          loser={winner && winner !== upperFighter.id}
          {...upperFighter}
          onEdit={(e) => onEdit(e, id, 'upperFighter')}
          firstRound={firstRound}
        />
        <FighterBuilder
          disabled={disabled || winner}
          winner={lowerFighter && winner === lowerFighter.id}
          loser={
            (winner && winner !== lowerFighter?.id) || lowerFighter === null
          }
          {...lowerFighter}
          onEdit={(e) => onEdit(e, id, 'lowerFighter')}
          firstRound={firstRound}
        />
      </div>
    </li>
  );
}

export default MatchBuilder;
