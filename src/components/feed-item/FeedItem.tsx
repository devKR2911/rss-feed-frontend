import { Card, Button } from 'react-bootstrap';

function FeedItem({ feedData }) {

    const viewFeed = () => {
        console.log(feedData);
    }

    return (
        <Card>
            <Card.Header>{feedData.title}</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>
                        URL: {feedData.url}
                    </p>
                    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
                </blockquote>
            </Card.Body>
            <Card.Footer>
                <div className="row">
                    <div className="col">
                        <Button
                            variant="primary"
                            size="sm" block
                            onClick={viewFeed}>View</Button>
                    </div>
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