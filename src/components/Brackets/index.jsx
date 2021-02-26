import React from 'react';

import Round from '../Round';
import Match from '../Match';

import styles from './styles.module.scss';

function Brackets({ matchList }) {
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
            <Match {...round.matches[0]} position="final" />
          </Round>
        );
      } else {
        const left = [];
        const right = [];

        round.matches.forEach((match, i) => {
          if (i + 1 <= elementAmount)
            left.push(<Match key={match.id} position="left" {...match} />);
          else right.push(<Match key={match.id} position="right" {...match} />);
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

export default Brackets;
