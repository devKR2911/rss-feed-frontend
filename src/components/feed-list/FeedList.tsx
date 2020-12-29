import FeedItem from '../feed-item/FeedItem';
import CreateFeed from '../create-feed/CreateFeed';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { httpGet } from '../../services/axios';

function FeedList() {
    const [feedList, setFeedData]: [any, any] = useState([]);
    const [showCreateFeed, showCreateFeedVisibility]: [any, any] = useState(false);

    const fetchFeedList = () => {
        const url = 'feed/getAllFeeds';
        httpGet(url)
        .then((response)=>{
            setFeedData(response.data.feeds);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchFeedList();
    }, []);

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
                {feedList.map(feed => {
                    return(
                        <div className="col-lg-4 py-2" key={feed._id}>
                            <FeedItem feedData={feed}/>
                        </div>
                    )
                })}
            </div>
            <CreateFeed
                show={showCreateFeed}
                onClose={() => {
                    fetchFeedList();
                    showCreateFeedVisibility(false);
                }}/>
        </div>
    );
}

export default FeedList;