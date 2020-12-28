import FeedItem from '../feed-item/FeedItem';
import { Button } from 'react-bootstrap';

const feedDataList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

function FeedList() {
    return (
        <div className="container">
            <div className="row">
                <div className="col py-2 d-flex justify-content-end">
                    <Button variant="outline-primary">Create Feed</Button>
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
        </div>
    );
}

export default FeedList;