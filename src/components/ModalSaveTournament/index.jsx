import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalSaveTournament({ show, onClose, onSave }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Salvar alterações</Modal.Title>
      </Modal.Header>
      <Modal.Body>Deseja salvar as alterações?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          type="submit"
          className="mr-2"
          onClick={onSave}
        >
          Sim
        </Button>
        <Button variant="secondary" type="button" onClick={onClose}>
          Não
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalSaveTournament;
