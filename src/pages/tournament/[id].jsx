import React, { useEffect, useState } from 'react';

import styles from '../../styles/Tournament.module.scss';

import TournamentTable from '../../components/Brackets';

function Tournament({ tournamentId }) {
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    fetch(`/api/tournaments/${tournamentId}`)
      .then((res) => res.json())
      .then((data) => setTournament(data));

    const interval = setInterval(() => {
      fetch(`/api/tournaments/${tournamentId}`)
        .then((res) => res.json())
        .then((data) => setTournament(data));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.overlay}>
        <img src="/logo.png" alt="BJJBET Selection" width="180" />
        <h2>{tournament?.name}</h2>
      </div>
      <TournamentTable matchList={tournament?.matchList} />
    </main>
  );
}

export default Tournament;

export async function getServerSideProps(context) {
  return {
    props: {
      tournamentId: context.params.id,
    },
  };
}
