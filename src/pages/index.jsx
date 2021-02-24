import React, { useState } from 'react';
import fs from 'fs';
import util from 'util';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import axios from 'axios';

const readFile = util.promisify(fs.readFile);

export default function Home({ tournaments }) {
  const [addModal, setAddModal] = useState(false);

  function submitAdd(e) {
    e.preventDefault();

    axios
      .post('/api/tournaments', {
        name: e.target.name.value,
      })
      .then(() => window.reload());
  }

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center h-100"
        style={{ backgroundColor: '#000' }}
      >
        <img src="/logo.png" alt="BJJBET Selection" width="200" />

        <Table className="w-50 bg-white mt-4">
          <thead>
            <tr>
              <th>Torneio</th>
              <th align="right">
                <Button
                  variant="success"
                  size="sm"
                  className="float-right"
                  onClick={() => setAddModal(true)}
                >
                  Novo
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map((el) => (
              <tr key={el.name}>
                <td>{el.name}</td>
                <td>
                  <Button variant="danger" size="sm" className="float-right">
                    Apagar
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    className="mr-2 float-right"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="primary"
                    className="mr-2 float-right"
                    href={`/tournament/${el.id}`}
                    target="_blank"
                    size="sm"
                  >
                    Visualizar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={addModal} onHide={() => setAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Criar novo torneio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitAdd}>
            <Form.Group>
              <Form.Label>Nome do torneio</Form.Label>
              <Form.Control type="text" name="name" required />
            </Form.Group>

            <div className="float-right">
              <Button variant="success" type="submit" className="mr-2">
                Criar torneio
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={() => setAddModal(false)}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export async function getServerSideProps() {
  const data = await readFile('./server/tournaments.json');
  const response = JSON.parse(data);
  const tournaments = response.map((el) => ({ id: el.id, name: el.name }));

  return {
    props: {
      tournaments,
    },
  };
}
