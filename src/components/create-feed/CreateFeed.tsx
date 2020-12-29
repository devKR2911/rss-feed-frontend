import { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { httpPost } from '../../services/axios';

function CreateFeed({ show, onClose }) {
  const [validated, setValidated] = useState<boolean | undefined>();
  const [feedTitle, setFeedTitle] = useState<string | undefined>();
  const [feedUrl, setFeedUrl] = useState<string | undefined>();
  const [textColor, setTextColor] = useState<string | undefined>('#000000');
  const [headlineColor, setHeadlineColor] = useState<string | undefined>('#000000');
  const [fontSize, setFontSize] = useState<number | undefined>();
  const [width, setWidth] = useState<number | undefined>();
  const [height, setHeight] = useState<number | undefined>();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {

    } else {
      const formData = {
        title: feedTitle,
        url: feedUrl,
        textColor,
        headlineColor,
        fontSize,
        width,
        height
      };
      const url = 'feed/saveFeed';
      httpPost(url, formData).then((response)=>{
        console.log(response);
      })
      .catch((error) => {
          console.log(error)
      });
    }
    setValidated(true);
  };

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
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} lg="12" md="12" sm="12" controlId="validationCustom01">
                <Form.Label>Feed Title {feedTitle}</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Title"
                  defaultValue=""
                  onChange={(e) => setFeedTitle(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide feed title.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} lg="12" md="12" sm="12" controlId="validationCustom02">
                <Form.Label>Feed URL {feedUrl}</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="URL"
                  pattern="^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                  defaultValue=""
                  onChange={(e) => setFeedUrl(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide feed url.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} lg="6" md="6" sm="12" controlId="validationCustom04">
                <Form.Label>Text Color {textColor}</Form.Label>
                <Form.Control
                  type="color"
                  placeholder="Text Color"
                  onChange={(e) => setTextColor(e.target.value)}
                  required />
                <Form.Control.Feedback type="invalid">
                  Please provide a text color.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} lg="6" md="6" sm="12" controlId="validationCustom03">
                <Form.Label>Headline Color {headlineColor}</Form.Label>
                <Form.Control
                  type="color"
                  placeholder="Headline Color"
                  onChange={(e) => setHeadlineColor(e.target.value)}
                  required />
                <Form.Control.Feedback type="invalid">
                  Please provide a headline color.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} lg="4" md="4" sm="12" controlId="validationCustomUsername">
                <Form.Label>Font Size {fontSize}</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    placeholder="Font Size"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter font size.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>


              <Form.Group as={Col} lg="4" md="4" sm="12" controlId="validationCustom05">
                <Form.Label>Width {width}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Width"
                  onChange={(e) => setWidth(Number(e.target.value))}
                  required />
                <Form.Control.Feedback type="invalid">
                  Please provide the width.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} lg="4" md="4" sm="12" controlId="validationCustom05">
                <Form.Label>Height {height}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Height"
                  onChange={(e) => setHeight(Number(e.target.value))}
                  required />
                <Form.Control.Feedback type="invalid">
                  Please provide the Height.
                </Form.Control.Feedback>
              </Form.Group>

            </Form.Row>
            <Button type="submit">Submit form</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );

}

export default CreateFeed;