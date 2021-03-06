import FeedItem from '../FeedItem/FeedItem';
import CreateFeed from '../CreateFeed/CreateFeed';
import { Button, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { httpGet, httpDelete } from '../../services/axios';
import DeleteFeed from '../DeleteFeed/DeleteFeed';
import ToastContainer from '../ToastContainer/ToastContainer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Loader from '../Loader/Loader';

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
                // console.log(error)
            })
    }

    const onEditFeed = (feed) => {
        // console.log(feed);
        setSelectedFeed(feed);
        showCreateFeedVisibility(true);
    }

    const onCreateFeed = () => {
        setSelectedFeed(null);
        showCreateFeedVisibility(true);
    }

    const onDeleteFeed = (feed) => {
        showDeleteFeedVisibility(true);
        setSelectedFeed(feed);
    }

    const deleteFeedData = (feed) => {
        const url = `feed/deleteFeed/${feed._id}`;
        setLoading(true);
        httpDelete(url)
            .then((response) => {
                setLoading(false);
                setToastTitle('Delete Successfull');
                setToastMessage('Feed has been deleted successfully.');
                setToastVisibility(true);
                fetchFeedList();
            })
            .catch((error) => {
                // console.log(error)
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchFeedList();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col py-2 d-flex justify-content-between">
                    <h3>Feeds</h3>
                    <Button variant="outline-primary" onClick={() => onCreateFeed()}>
                        <div className="title">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Create Feed
                        </div>
                    </Button>
                </div>
            </div>
            <div className="row">
                {isLoading ?
                    <Loader />
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