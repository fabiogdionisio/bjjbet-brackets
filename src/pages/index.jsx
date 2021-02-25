import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TableTournament from '../components/TableTournament';
import ModalAddTournament from '../components/ModalAddTournament';
import Loader from '../components/Loader';

export default function Home() {
  const [addModal, setAddModal] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function fetchTournaments() {
    setIsLoading(true);
    axios
      .get(`/api/tournaments`)
      .then(({ data }) => setTournaments(data))
      .then(() => setIsLoading(false));
  }

  function handleSubmitAdd(e) {
    e.preventDefault();

    axios
      .post('/api/tournaments', {
        name: e.target.name.value,
      })
      .then(() => setAddModal(false))
      .then(() => fetchTournaments());
  }

  function handleDelete(id) {
    if (
      confirm(
        `Tem certeza que deseja apagar o torneio "${
          tournaments.find((el) => el.id === id).name
        }?"`
      )
    ) {
      axios.delete(`/api/tournaments/${id}`).then(() => fetchTournaments());
    }
  }

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <img src="/logo.png" alt="BJJBET Selection" width="200" />

        <Loader isLoading={isLoading}>
          <TableTournament
            data={tournaments}
            handleAdd={() => setAddModal(true)}
            handleDelete={handleDelete}
          />
        </Loader>
      </div>

      <ModalAddTournament
        show={addModal}
        onClose={() => setAddModal(false)}
        onSubmit={handleSubmitAdd}
      />
    </>
  );
}
