import { useEffect, useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import RSSParser from 'rss-parser';
import { httpGet } from '../../services/axios';
import { useParams } from "react-router-dom";
import { CORS_PROXY } from '../../services/const';

let parser = new RSSParser();

function ViewFeed() {
    let { id } = useParams();
    const [feedTitle, setFeedTitle]: [string, any] = useState('');
    const [feedList, setFeedList]: [any, any] = useState([]);
    const [show, setShow] = useState(false);

    const AlertDismissibleExample = () => {
      
        if (show) {
          return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Error!!</Alert.Heading>
              <p>
                Invalid feed or Feed url doesnot exist.
              </p>
            </Alert>
          );
        }
        return null;
      }

    const fetchFeedDetails = (feedId) => {
        httpGet(`feed/getFeed/${feedId}`)
        .then((response)=>{
            console.log(response);
            fetchFeed(response.data.feed.url);
        })
        .catch((error) => {
            console.log(error);
            setShow(true);
        })
    }

    const fetchFeed = (url) => {
        parser.parseURL(CORS_PROXY + url, (err, feed) => {
            if (err) {
                setShow(true);
                throw err;
            };
            setFeedTitle(feed.title);
            setFeedList(feed.items);
        })
    }

    useEffect(() => {
        fetchFeedDetails(id);
    }, []);

    return (
        <div className="container">
            <AlertDismissibleExample />
            <h1 className="center title">
                {feedTitle}
            </h1>
            {feedList.map((item, index) => {
                return (
                    <Card key={item.isoDate} className="my-2">
                        <Card.Header>{item.title}</Card.Header>
                        <Card.Body>
                            <div
                            dangerouslySetInnerHTML={{
                                __html: item.content,
                              }}></div>
                        </Card.Body>
                    </Card>
                );
            })}
        </div>
    )
}

export default ViewFeed;