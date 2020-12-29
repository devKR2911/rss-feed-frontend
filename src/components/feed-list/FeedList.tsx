import FeedItem from '../feed-item/FeedItem';
import CreateFeed from '../create-feed/CreateFeed';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const feedDataList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

function FeedList() {
    const [showCreateFeed, showCreateFeedVisibility]: [any, any] = useState(false);
    return (
        <div className="container">
            <div className="row">
                <div className="col py-2 d-flex justify-content-end">
                    <Button variant="outline-primary" onClick={() => showCreateFeedVisibility(true)}>
                        Create Feed
                    </Button>
                </div>
            </div>
            <div className="row">
                {feedDataList.map(feed => {
                    return(
                        <div className="col-lg-4 py-2">
                            <FeedItem />
                        </div>
                    )
                })}
            </div>
            <CreateFeed
                show={showCreateFeed}
                onClose={() => {showCreateFeedVisibility(false)}}/>
        </div>
    );
}

export default FeedList;