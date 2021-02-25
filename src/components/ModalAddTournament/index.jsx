import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function ModalAddTournament({ show, onClose, onSubmit }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Criar novo torneio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Nome do torneio</Form.Label>
            <Form.Control type="text" name="name" required />
          </Form.Group>

          <div className="float-right">
            <Button variant="success" type="submit" className="mr-2">
              Criar torneio
            </Button>
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalAddTournament;
