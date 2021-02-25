import React from 'react';

import Round from '../Round';
import MatchBuilder from '../MatchBuilder/index';

import styles from './styles.module.scss';

function BracketsWithEdition({
  matchList,
  onSelectNextMatch,
  onEditOrder,
  onEdit,
  advanceTeam,
  redoMatch,
}) {
  function renderRound(data) {
    if (!data) return null;

    const render = [];
    const dataCopy = [...data];
    const reversedMatchList = dataCopy.reverse();

    reversedMatchList.forEach((round, index) => {
      const elementAmount = round.matches.length / 2;

      if (round.matches.length === 1) {
        render.push(
          <Round key={0}>
            <MatchBuilder
              {...round.matches[0]}
              disabled
              onSelectNextMatch={onSelectNextMatch}
              onEditOrder={onEditOrder}
              onEdit={onEdit}
              advanceTeam={advanceTeam}
              redoMatch={redoMatch}
            />
          </Round>
        );
      } else {
        const left = [];
        const right = [];

        round.matches.forEach((match, i) => {
          if (i + 1 <= elementAmount)
            left.push(
              <MatchBuilder
                key={match.id}
                {...match}
                disabled={index !== reversedMatchList.length - 1}
                firstRound={index === reversedMatchList.length - 1}
                onSelectNextMatch={onSelectNextMatch}
                onEditOrder={onEditOrder}
                onEdit={onEdit}
                advanceTeam={advanceTeam}
                redoMatch={redoMatch}
              />
            );
          else
            right.push(
              <MatchBuilder
                key={match.id}
                {...match}
                disabled={index !== reversedMatchList.length - 1}
                firstRound={index === reversedMatchList.length - 1}
                onSelectNextMatch={onSelectNextMatch}
                onEditOrder={onEditOrder}
                onEdit={onEdit}
                advanceTeam={advanceTeam}
                redoMatch={redoMatch}
              />
            );
        });

        render.unshift(
          <Round
            key={`${round.round}-left`}
            position="left"
            isSemiFinal={index === 1}
          >
            {left}
          </Round>
        );
        render.push(
          <Round
            key={`${round.round}-right`}
            position="right"
            isSemiFinal={index === 1}
          >
            {right}
          </Round>
        );
      }
    });
    return <>{render}</>;
  }
  return <div className={styles.wrapper}>{renderRound(matchList)}</div>;
}

export default BracketsWithEdition;
