import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

import {
  FormBuilder,
  FieldGroup,
  FieldControl,
  Validators,
  FormGenerator,
} from "react-reactive-form";

function CreateFeed({ show, onClose }) {

  const TextInput = ({ handler, touched, hasError, meta }) => (
    <div>
      <input className="form-control" placeholder={`Enter ${meta.label}`} {...handler()} />
      <span>
        {touched
          && hasError("required")
          && `${meta.label} is required`}
      </span>
    </div>
  )
  const createFeedForm = FormBuilder.group({
    feedTitle: ["", Validators.required],
    feedURL: ["", Validators.required],
    feedFontSize: ["", Validators.required],
    feedHeadingColor: ["", Validators.required],
    feedTextColor: ["", Validators.required],
    feedBackgroundColor: ["", Validators.required],
    feedWidth: ["", Validators.required],
    feedHeight: ["", Validators.required],
  });
  const handleReset = () => {
    createFeedForm.reset();
  }
  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    if(createFeedForm.valid) {
      console.log("Form values", createFeedForm.value);
    }
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
        <Form>
          <FieldGroup
            control={createFeedForm}
            render={({ get, invalid }) => (
              <form>
                <Modal.Body>
                  <Row>
                    <Col>
                      <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <FieldControl
                          name="feedTitle"
                          render={TextInput}
                          meta={{ label: "Feed Title" }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="feedURL">
                        <Form.Label>Title</Form.Label>
                        <FieldControl
                          name="feedURL"
                          render={TextInput}
                          meta={{ label: "Feed URL" }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="feedFontSize">
                        <Form.Label>Font Size</Form.Label>
                        <FieldControl
                          name="feedFontSize"
                          render={TextInput}
                          meta={{ label: "Font Size" }}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="feedHeadingColor">
                        <Form.Label>Heading Color</Form.Label>
                        <FieldControl
                          name="feedHeadingColor"
                          render={TextInput}
                          meta={{ label: "Heading Color" }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="feedTextColor">
                        <Form.Label>Text Color</Form.Label>
                        <FieldControl
                          name="feedTextColor"
                          render={TextInput}
                          meta={{ label: "Text Color" }}
                        />

                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="feedBackgroundColor">
                        <Form.Label>Background Color</Form.Label>
                        <FieldControl
                          name="feedBackgroundColor"
                          render={TextInput}
                          meta={{ label: "Background Color" }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="feedWidth">
                        <Form.Label>Width</Form.Label>
                        <FieldControl
                          name="feedWidth"
                          render={TextInput}
                          meta={{ label: "Width" }}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="feedHeight">
                        <Form.Label>Height</Form.Label>
                        <FieldControl
                          name="feedHeight"
                          render={TextInput}
                          meta={{ label: "Height" }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleReset}>
                    Reset
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>Understood</Button>
                </Modal.Footer>
              </form>
            )}
          />
        </Form>
      </Modal>
    </>
  );

}

export default CreateFeed;