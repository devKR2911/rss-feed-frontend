import { Card, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const editTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Edit RSS Feed
    </Tooltip>
);

const deleteTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Delete RSS Feed
    </Tooltip>
);

const viewTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        See content of RSS Feed.
    </Tooltip>
);

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
        <Card className="shadow-card zoom">
            <Card.Header>
                <div className="title">
                {feedData.title}
                </div>
                </Card.Header>
            <Card.Body className="content">
                <a href={feedData.url} rel="noreferrer" className="regular" target="_blank">
                    {feedData.url}
                </a>

                <Row>
                    <Col><small>Font Size</small></Col>
                    <Col><small className="semi-bold"> {feedData.fontSize}px</small></Col>
                </Row>
                <Row>
                    <Col><small>Height</small></Col>
                    <Col><small className="semi-bold">{feedData.height}px</small></Col>
                </Row>
                <Row>
                    <Col><small>Width</small></Col>
                    <Col><small className="semi-bold">{feedData.width}px</small></Col>
                </Row>
                <Row>
                    <Col><small>Text Color</small></Col>
                    <Col>
                        <Row>
                            <Col><small className="semi-bold">{feedData.textColor}</small></Col>
                            <Col className="d-flex flex-row-reverse">
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
                    <Col><small>Headline Color</small></Col>
                    <Col>
                        <Row>
                            <Col><small className="semi-bold">{feedData.headlineColor}</small></Col>
                            <Col className="d-flex flex-row-reverse">
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
                        <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={viewTooltip}
                            >
                            <Button
                                variant="primary"
                                size="sm" block
                                onClick={viewFeed}>
                                <FontAwesomeIcon icon={faEye} className="mr-2" />
                                View
                            </Button>
                        </OverlayTrigger>
                    </div>
                    <div className="col">
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={editTooltip}
                        >
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={onEditFeed}
                                block>
                                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                    Edit
                            </Button>
                        </OverlayTrigger>
                    </div>
                    <div className="col">
                        <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={deleteTooltip}
                            >
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={onDeleteFeed}
                                block>

                                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                Delete
                            </Button>
                        </OverlayTrigger>
                    </div>
                </div>
            </Card.Footer>
        </Card>
    )
}

export default FeedItem;