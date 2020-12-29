import FeedItem from '../feed-item/FeedItem';
import CreateFeed from '../create-feed/CreateFeed';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { httpGet, httpDelete } from '../../services/axios';
import DeleteFeed from '../delete-feed/DeleteFeed';

function FeedList() {
    const [feedList, setFeedData]: [any, any] = useState([]);
    const [showCreateFeed, showCreateFeedVisibility]: [any, any] = useState(false);
    const [showDeleteFeed, showDeleteFeedVisibility]: [any, any] = useState(false);
    const [selectedFeed, setSelectedFeed]: [any, any] = useState(null);

    const fetchFeedList = () => {
        setFeedData([]);
        const url = 'feed/getAllFeeds';
        httpGet(url)
        .then((response)=>{
            setFeedData(response.data.feeds);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const onEditFeed = (feed) => {
        console.log(feed);
        setSelectedFeed(feed);
        showCreateFeedVisibility(true);
    }

    const onCreateFeed = () => {
        showCreateFeedVisibility(true);
        setSelectedFeed(null);
    }

    const onDeleteFeed = (feed) => {
        showDeleteFeedVisibility(true);
        setSelectedFeed(feed);
    }

    const deleteFeedData = (feed) => {
        const url = `feed/deleteFeed/${feed._id}`;
        httpDelete(url)
        .then((response)=>{
            fetchFeedList();
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
                    <Button variant="outline-primary" onClick={() => onCreateFeed()}>
                        Create Feed
                    </Button>
                </div>
            </div>
            <div className="row">
                {feedList.map(feed => {
                    return(
                        <div className="col-lg-4 py-2" key={feed._id}>
                            <FeedItem
                                feedData={feed}
                                editFeed={onEditFeed}
                                deleteFeed={onDeleteFeed}/>
                        </div>
                    )
                })}
            </div>
            <CreateFeed
                show={showCreateFeed}
                feedData={selectedFeed}
                onClose={(fetchAll) => {
                    if(fetchAll) {
                        fetchFeedList();
                    }
                    showCreateFeedVisibility(false);
            }}/>
            <DeleteFeed
                show={showDeleteFeed}
                onClose={(fetchAll) => {
                    if(fetchAll) {
                        deleteFeedData(selectedFeed);
                    }
                    showDeleteFeedVisibility(false);
                }}
            />
        </div>
    );
}

export default FeedList;