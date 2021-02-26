import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../../styles/Edit.module.scss';

import BracketsWithEdition from '../../components/BracketsWithEdition';
import Loader from '../../components/Loader';
import ModalDiscardTournament from '../../components/ModalDiscardTournament';
import ModalSaveTournament from '../../components/ModalSaveTournament';

import matchListTemplate from '../../../server/matchListTemplate.json';

function Edit({ tournamentId }) {
  const [tournament, setTournament] = useState(null);
  const [navigation, setNavigation] = useState(null);
  const [matchList, setMatchList] = useState(matchListTemplate);
  const [isLoading, setIsLoading] = useState(true);
  const [modalSave, setModalSave] = useState(false);
  const [modalDiscard, setModalDiscard] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/tournaments/${tournamentId}`)
      .then((res) => res.json())
      .then((data) => {
        setTournament(data);
        if (data.matchList.length > 0) setMatchList(data.matchList);
      })
      .then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/tournaments/`)
      .then((res) => res.json())
      .then((data) => setNavigation(data))
      .then(() => setIsLoading(false));
  }, []);

  function handleDiscard() {
    setModalDiscard(true);
  }

  function handleNextMatch(e) {
    const { value } = e.target;

    setMatchList((prev) =>
      prev.map((round) => ({
        ...round,
        matches: round.matches.map((match) => ({
          ...match,
          nextMatch: match.nextMatch ? false : parseInt(value, 10) === match.id,
        })),
      }))
    );
  }

  function handleEditOrder(e, id) {
    let { value } = e.target;

    if (!value) value = null;

    setMatchList((prev) =>
      prev.map((round) => {
        const index = round.matches.findIndex(
          (match) => parseInt(id, 10) === match.id
        );

        if (index < 0) {
          return round;
        }
        const updatedMatches = [...round.matches];
        updatedMatches[index].order = parseInt(value, 10);
        return {
          ...round,
          matches: updatedMatches,
        };
      })
    );
  }

  function handleSave() {
    axios
      .put(`/api/tournaments/${tournamentId}`, {
        ...tournament,
        matchList: [...matchList],
      })
      .then(() => {
        toast.success('Torneio atualizado com sucesso!');
        setModalSave(false);
      });
  }

  function handleEdit(e, id, fighterPosition) {
    let { value } = e.target;
    const { name } = e.target;

    if (!value) value = null;

    setMatchList((prev) =>
      prev.map((round) => {
        const index = round.matches.findIndex(
          (match) => parseInt(id, 10) === match.id
        );

        if (index < 0) {
          return round;
        }
        const updatedMatches = [...round.matches];
        if (updatedMatches[index][fighterPosition] === null) {
          updatedMatches[index][fighterPosition] = {
            [name]: value,
          };
        } else {
          updatedMatches[index][fighterPosition][name] = value;
        }
        return {
          ...round,
          matches: updatedMatches,
        };
      })
    );
  }

  function advanceTeam(matchId, winnerId, winnerPosition) {
    const isEven = matchId % 2 === 0;

    setMatchList((prev) => {
      let winnerRoundId = null;
      let nextMatchid = null;
      let fighter = null;

      const newState = prev.map((round, i) => {
        if (winnerRoundId !== null && winnerRoundId + 1 === i) {
          const index = round.matches.findIndex(
            (match) => parseInt(nextMatchid, 10) === match.id
          );

          if (index < 0) {
            return round;
          }

          const updatedMatches = [...round.matches];

          if (isEven) {
            updatedMatches[index].lowerFighter = {
              ...fighter,
            };
          } else {
            updatedMatches[index].upperFighter = {
              ...fighter,
            };
          }

          return {
            ...round,
            matches: updatedMatches,
          };
        }

        const index = round.matches.findIndex(
          (match) => parseInt(matchId, 10) === match.id
        );

        if (index < 0) {
          return round;
        }
        const updatedMatches = [...round.matches];
        updatedMatches[index].winner = parseInt(winnerId, 10);
        nextMatchid = updatedMatches[index].nextMatchId;
        winnerRoundId = i;
        fighter = { ...updatedMatches[index][winnerPosition] };

        return {
          ...round,
          matches: updatedMatches,
        };
      });
      return newState;
    });
  }

  function redoMatch(matchId) {
    const fighter = {
      id: 0,
      name: 'A ser definido',
      team: null,
    };
    let winnerRoundId = null;

    setMatchList((prev) =>
      prev.map((round, i) => {
        if (winnerRoundId !== null && winnerRoundId + 1 === i) {
          const index = round.matches.findIndex(
            (match) => parseInt(matchId, 10) === match.id
          );

          if (index < 0) {
            return round;
          }

          const updatedMatches = [...round.matches];

          updatedMatches[index].lowerFighter = { ...fighter };
          updatedMatches[index].upperFighter = { ...fighter };
          updatedMatches[index].winner = null;

          return {
            ...round,
            matches: updatedMatches,
          };
        }
        const indexes = [];

        round.matches.forEach((match, j) => {
          if (parseInt(matchId, 10) === match.nextMatchId) indexes.push(j);
        });

        if (indexes.length === 0) {
          return round;
        }

        const updatedMatches = [...round.matches];

        indexes.forEach((index) => {
          updatedMatches[index].winner = null;
        });

        winnerRoundId = i;

        return {
          ...round,
          matches: updatedMatches,
        };
      })
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.overlay}>
        <img src="/logo.png" alt="BJJBET Selection" width="180" />
        <h2>{tournament?.name}</h2>
      </div>
      <Loader isLoading={isLoading}>
        <BracketsWithEdition
          matchList={matchList}
          onSelectNextMatch={handleNextMatch}
          onEditOrder={handleEditOrder}
          onEdit={handleEdit}
          advanceTeam={advanceTeam}
          redoMatch={redoMatch}
        />
        <div className={styles.submit}>
          <Button
            size="lg"
            variant="success"
            className="mr-3"
            onClick={() => setModalSave(true)}
          >
            Salvar
          </Button>
          <Button
            size="lg"
            variant="info"
            className="mr-3"
            onClick={() => {
              window.location.href = `/tournament/${tournamentId}`;
            }}
          >
            Visualizar
          </Button>
          <Button size="lg" variant="secondary" onClick={handleDiscard}>
            Cancelar
          </Button>

          {navigation?.map((el) => {
            if (parseInt(el.id, 10) !== parseInt(tournamentId, 10))
              return (
                <Button
                  size="lg"
                  variant="primary"
                  className="ml-3"
                  onClick={() => {
                    window.location.href = `/edit/${el.id}`;
                  }}
                >
                  Ir para {el.name}
                </Button>
              );
          })}
        </div>
      </Loader>

      <ModalSaveTournament
        show={modalSave}
        onClose={() => setModalSave(false)}
        onSave={handleSave}
      />
      <ModalDiscardTournament
        show={modalDiscard}
        onClose={() => setModalDiscard(false)}
        onDiscard={() => {
          window.location.href = '/';
        }}
      />
    </main>
  );
}

export default Edit;

export async function getServerSideProps(context) {
  return {
    props: {
      tournamentId: context.params.id,
    },
  };
}
