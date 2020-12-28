import { Card, Button } from 'react-bootstrap';

function FeedItem() {
    return (
        <Card>
            <Card.Header>Quote</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer posuere erat a ante.
                    </p>
                    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
                </blockquote>
            </Card.Body>
            <Card.Footer>
                <div className="row">
                    <div className="col">
                        <Button variant="secondary" size="sm" block>Edit</Button>
                    </div>
                    <div className="col">
                        <Button variant="danger" size="sm" block>Delete</Button>
                    </div>
                </div>
            </Card.Footer>
        </Card>
    )
}

export default FeedItem;