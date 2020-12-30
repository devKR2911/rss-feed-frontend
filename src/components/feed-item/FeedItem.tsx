import { Card, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';

function FeedItem({ feedData, editFeed, deleteFeed }) {
    let history = useHistory();

    const viewFeed = () => {
        history.push(`/${feedData._id}`)
    }

    const onEditFeed = () => {
        editFeed(feedData);
    }

    const onDeleteFeed = () => {
        deleteFeed(feedData);
    }

    return (
        <Card>
            <Card.Header>{feedData.title}</Card.Header>
            <Card.Body>
                <p> {feedData.url}
                </p>

                <Row>
                    <Col>
                        <small>
                            Font Size
                    </small>
                    </Col>
                    <Col>
                        <small>
                            {feedData.fontSize}
                        </small>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <small>
                            Height
                    </small>
                    </Col>
                    <Col>
                        <small>
                            {feedData.height}
                        </small>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <small>
                            Width
                    </small>
                    </Col>
                    <Col>
                        <small>
                            {feedData.width}
                        </small>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <small>
                            Text Color
                    </small>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <small>
                                    {feedData.textColor}
                                </small>
                            </Col>
                            <Col>
                                <div style={{
                                    display: 'flex',
                                    width: '25px',
                                    height: '25px',
                                    backgroundColor: feedData.textColor,
                                }}>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <small>
                            Headline Color
                    </small>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <small>
                                    {feedData.headlineColor}
                                </small>
                            </Col>
                            <Col>
                                <div style={{
                                    display: 'flex',
                                    width: '25px',
                                    height: '25px',
                                    backgroundColor: feedData.headlineColor,
                                }}>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                <div className="row">
                    <div className="col">
                        <Button
                            variant="primary"
                            size="sm" block
                            onClick={viewFeed}>
                            View
                        </Button>
                    </div>
                    <div className="col">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={onEditFeed}
                            block>
                            Edit
                        </Button>
                    </div>
                    <div className="col">
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={onDeleteFeed}
                            block>
                            Delete
                        </Button>
                    </div>
                </div>
            </Card.Footer>
        </Card>
    )
}

export default FeedItem;