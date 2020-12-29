import { Modal, Button } from 'react-bootstrap';

function DeleteFeed({ show, onClose }) {
  return (
    <>
      <Modal
        size="sm"
        show={show}
        onHide={() => onClose(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
              Confirm!!
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Do you want to delete this feed?
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => onClose(false)}>No</Button>
            <Button variant="primary" onClick={() => onClose(true)}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default DeleteFeed;