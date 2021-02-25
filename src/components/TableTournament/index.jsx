import React from 'react';
import { Button, Table } from 'react-bootstrap';
import Link from 'next/link';

function TableTournament({ handleAdd, handleDelete, data }) {
  return (
    <Table className="w-50 bg-white mt-4">
      <thead>
        <tr>
          <th>Torneio (Chaves)</th>
          <th align="right">
            <Button
              variant="success"
              size="sm"
              className="float-right"
              onClick={() => handleAdd(true)}
            >
              Novo
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((el) => (
          <tr key={el.id}>
            <td>{el.name}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                className="float-right"
                onClick={() => handleDelete(el.id)}
              >
                Apagar
              </Button>
              <Link href={`/edit/${el.id}`}>
                <Button
                  variant="warning"
                  size="sm"
                  className="mr-2 float-right"
                  href={`/edit/${el.id}`}
                >
                  Editar
                </Button>
              </Link>
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
  );
}

export default TableTournament;
