import FeedItem from '../feed-item/FeedItem';
import CreateFeed from '../create-feed/CreateFeed';
import { Button, Alert, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { httpGet, httpDelete } from '../../services/axios';
import DeleteFeed from '../delete-feed/DeleteFeed';
import ToastContainer from '../toast-container/ToastContiner';

function FeedList() {
    const [feedList, setFeedData]: [any, any] = useState([]);
    const [showCreateFeed, showCreateFeedVisibility]: [any, any] = useState(false);
    const [showDeleteFeed, showDeleteFeedVisibility]: [any, any] = useState(false);
    const [selectedFeed, setSelectedFeed]: [any, any] = useState(null);
    const [showToast, setToastVisibility]: [any, any] = useState(false);
    const [toastTitle, setToastTitle]: [any, any] = useState('');
    const [toastMessage, setToastMessage]: [any, any] = useState('');
    const [isLoading, setLoading]: [boolean, any] = useState(false);

    const fetchFeedList = () => {
        setFeedData([]);
        setLoading(true);
        const url = 'feed/getAllFeeds';
        httpGet(url)
            .then((response) => {
                setLoading(false);
                setFeedData(response.data.feeds);
            })
            .catch((error) => {
                setLoading(false);
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
            .then((response) => {
                setToastTitle('Delete Successfull');
                setToastMessage('Feed has been deleted successfully.');
                setToastVisibility(true);
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
                {isLoading ?

                    <div className="col-12 text-center mt-5">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>

                    :

                    feedList.length > 0 ? feedList.map(feed => {
                        return (
                            <div className="col-lg-4 col-md-6 py-2" key={feed._id}>
                                <FeedItem
                                    feedData={feed}
                                    editFeed={onEditFeed}
                                    deleteFeed={onDeleteFeed} />
                            </div>
                        )
                    }) :
                        <div className="col-12">
                            <Alert key='no-data-alert' variant='info'>
                                No feed has been added
                        </Alert>
                        </div>
                }

            </div>
            <CreateFeed
                show={showCreateFeed}
                feedData={selectedFeed}
                onClose={(fetchAll) => {
                    if (fetchAll) {
                        fetchFeedList();
                        setToastTitle(selectedFeed ? 'Update Successful' : 'Create Successful');
                        setToastMessage(selectedFeed ? 'Feed has been updated successfully.' : 'Feed has been created successfully.');
                        setToastVisibility(true);
                    }
                    showCreateFeedVisibility(false);
                }} />
            <DeleteFeed
                show={showDeleteFeed}
                onClose={(fetchAll) => {
                    if (fetchAll) {
                        deleteFeedData(selectedFeed);
                    } else {
                    }
                    showDeleteFeedVisibility(false);
                }}
            />
            <ToastContainer
                showToast={showToast}
                onToastClose={() => {
                    setToastTitle('');
                    setToastMessage('');
                    setToastVisibility(false);
                }}
                title={toastTitle}
                message={toastMessage}
            />
        </div>
    );
}

export default FeedList;