import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalDiscardTournament({ show, onClose, onDiscard }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Descartar alterações</Modal.Title>
      </Modal.Header>
      <Modal.Body>Deseja descartar as alterações?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          type="submit"
          className="mr-2"
          onClick={onDiscard}
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

export default ModalDiscardTournament;
