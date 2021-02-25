import React, { useEffect, useState } from 'react';

import styles from '../../styles/Tournament.module.scss';

import BracketsWithEdition from '../../components/BracketsWithEdition';
import Loader from '../../components/Loader';

function Edit({ tournamentId }) {
  const [tournament, setTournament] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/tournaments/${tournamentId}`)
      .then((res) => res.json())
      .then((data) => setTournament(data))
      .then(() => setIsLoading(false));
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.overlay}>
        <img src="/logo.png" alt="BJJBET Selection" width="180" />
        <h2>{tournament?.name}</h2>
      </div>
      <Loader isLoading={isLoading}>
        <BracketsWithEdition matchList={tournament?.matchList} />
      </Loader>
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
