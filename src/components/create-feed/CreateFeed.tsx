import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

function CreateFeed({ show, onClose }) {

  // const [showCreateFeed, showCreateFeedVisibility]: [any, any] = useState(false);

  const handleSubmit = () => {
    console.log('Submit triggered');
  }

  const handleChange = () => {
    console.log('Change triggered');
    console.log(selectValue);
  }
  let selectValue = '';
  return (
    <>
      <Modal
        show={show}
        onHide={() => onClose()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Feed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" placeholder="Feed Title" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>URL</Form.Label>
                  <Form.Control type="text" placeholder="Feer URL" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Font Size</Form.Label>
                  <Form.Control type="text" placeholder="Feer URL" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Heading Color</Form.Label>
                  <Form.Control type="text" placeholder="Feer URL" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Text Color</Form.Label>
                  <Form.Control type="text" placeholder="Feer URL" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Background Color</Form.Label>
                  <Form.Control type="text" placeholder="Feer URL" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Width</Form.Label>
                  <Form.Control type="text" placeholder="Feer URL" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Height</Form.Label>
                  <Form.Control type="text" placeholder="Feer URL" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose()}>
            Close
              </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default CreateFeed;