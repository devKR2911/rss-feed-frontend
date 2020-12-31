import { useState, useEffect } from 'react';
import { Modal, Button, Form, Col, InputGroup } from 'react-bootstrap';
import { httpPost, httpPut } from '../../services/axios';
import Loader from '../Loader/Loader';

function CreateFeed({ show, onClose, feedData }) {
  
  const [validated, setValidated] = useState<boolean | undefined>(false);
  const [feedTitle, setFeedTitle] = useState<string | undefined>('');
  const [feedUrl, setFeedUrl] = useState<string | undefined>('');
  const [textColor, setTextColor] = useState<string | undefined>('#000000');
  const [headlineColor, setHeadlineColor] = useState<string | undefined>('#000000');
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>('#000000');
  const [fontSize, setFontSize] = useState<number | undefined>(10);
  const [width, setWidth] = useState<number | undefined>(100);
  const [height, setHeight] = useState<number | undefined>(100);
  const [isLoading, setLoading] = useState<boolean | undefined>(false);

  useEffect(() => {
    if(feedData) {
      setFormFelds(feedData);
    } else {
      setFormFelds(null);
    }
  }, [feedData]);

  useEffect(() => {
    setValidated(false);
  }, [show]);

  const setFormFelds = (data) => {
    setFeedTitle(data? data.title: '');
    setFeedUrl(data? data.url: '');
    setTextColor(data? data.textColor: '#000000');
    setHeadlineColor(data? data.headlineColor: '#000000');
    setFontSize(data? data.fontSize: 10);
    setWidth(data? data.width: 100);
    setHeight(data? data.height: 100);
    setBackgroundColor(data? data.backgroundColor: '#000000');
  }


  const handleSubmit = (event) => {
    console.log('Creating Feed');
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      // Do nothing
    } else {
      let formData = {
        title: feedTitle,
        url: feedUrl,
        textColor,
        headlineColor,
        fontSize,
        width,
        height,
        backgroundColor
      };
      setLoading(true);
      if(feedData) {
        formData['id'] = feedData._id;
        // Update
        const url = 'feed/updateFeed';
        httpPut(url, formData).then((response)=>{
          setFormFelds(null);
          const fetchAll = true;
          setLoading(false);
          onClose(fetchAll);
        })
        .catch((error) => {
            // console.log(error)
            setLoading(false);
        });
      } else {
        // Create
        const url = 'feed/saveFeed';
        httpPost(url, formData).then((response)=>{
          setFormFelds(null);
          const fetchAll = true;
          setLoading(false);
          onClose(fetchAll);
        })
        .catch((error) => {
            // console.log(error)
            setLoading(false);
        });
      }
    }
    setValidated(true);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setFormFelds(null);
          onClose(false);
        }}
        backdrop="static"
        keyboard={false}
      >
        {isLoading ? <Loader /> : <div/>}
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="semi-bold">
              {feedData? 'Update Feed': 'Create Feed'}
            </div>
          </Modal.Title>
        </Modal.Header>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body className="content">
            <Form.Row>
              <Form.Group as={Col} lg="12" md="12" sm="12" controlId="validationCustom01">
                <Form.Label>Feed Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Title"
                  value={feedTitle}
                  onChange={(e) => setFeedTitle(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide feed title.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} lg="12" md="12" sm="12" controlId="validationCustom02">
                <Form.Label>Feed URL</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="URL"
                  pattern="^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                  value={feedUrl}
                  onChange={(e) => setFeedUrl(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide feed url.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} lg="4" md="4" sm="12" controlId="validationCustom04">
                <Form.Label>Text Color</Form.Label>
                <Form.Control
                  type="color"
                  placeholder="Text Color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  required />
                <Form.Control.Feedback type="invalid">
                  Please provide a text color.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} lg="4" md="4" sm="12" controlId="validationCustom03">
                <Form.Label>Headline Color</Form.Label>
                <Form.Control
                  type="color"
                  placeholder="Headline Color"
                  value={headlineColor}
                  onChange={(e) => setHeadlineColor(e.target.value)}
                  required />
                <Form.Control.Feedback type="invalid">
                  Please provide a headline color.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} lg="4" md="4" sm="12" controlId="validationCustom03">
                <Form.Label>Background Color</Form.Label>
                <Form.Control
                  type="color"
                  placeholder="Background Color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  required />
                <Form.Control.Feedback type="invalid">
                  Please provide a background color.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} lg="4" md="4" sm="12" controlId="validationCustomUsername">
                <Form.Label>Font Size</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    value={fontSize}
                    placeholder="Font Size"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter font size.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} lg="4" md="4" sm="12" controlId="validationCustom05">
                <Form.Label>Width</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Width"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  required />
                <Form.Control.Feedback type="invalid">
                  Please provide the width.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} lg="4" md="4" sm="12" controlId="validationCustom05">
                <Form.Label>Height</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Height"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  required />
                <Form.Control.Feedback type="invalid">
                  Please provide the Height.
                </Form.Control.Feedback>
              </Form.Group>

            </Form.Row>
        </Modal.Body>
        <Modal.Footer>
            <Button type="submit">Submit</Button>
            </Modal.Footer>
          </Form>
      </Modal>
    </>
  );

}

export default CreateFeed;