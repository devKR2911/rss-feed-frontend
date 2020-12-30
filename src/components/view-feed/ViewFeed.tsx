import { useEffect, useState } from 'react';
import { Card, Alert, Spinner } from 'react-bootstrap';
import RSSParser from 'rss-parser';
import { httpGet } from '../../services/axios';
import { useParams } from "react-router-dom";
import { CORS_PROXY } from '../../services/const';

let parser = new RSSParser();

function ViewFeed() {
    let { id } = useParams();
    const [feedTitle, setFeedTitle]: [string, any] = useState('');
    const [feedList, setFeedList]: [any, any] = useState([]);
    const [textColor, setTextColor]: [any, any] = useState('');
    const [headlineColor, setHeadlineColor]: [any, any] = useState('');
    const [fontSize, setFontSize]: [any, any] = useState('10px');
    const [height, setHeight]: [any, any] = useState('10px');
    const [width, setWidth]: [any, any] = useState('10px');
    const [show, setShow] = useState(false);
    const [isLoading, setLoading]: [boolean, any] = useState(false);

    const InvalidFeed = () => {

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
            .then((response) => {
                console.log(response);
                const feed = response.data.feed;
                fetchFeed(feed.url);
                setTextColor(feed.textColor);
                setHeadlineColor(feed.headlineColor);
                setFontSize(feed.fontSize + 'px');
                setHeight(feed.height + 'px');
                setWidth(feed.width + 'px');
            })
            .catch((error) => {
                console.log(error);
                setShow(true);
                setLoading(false);
            })
    }

    const fetchFeed = (url) => {
        parser.parseURL(CORS_PROXY + url, (err, feed) => {
            if (err) {
                setShow(true);
                setLoading(false);
                throw err;
            };
            setFeedTitle(feed.title);
            setFeedList(feed.items);
            setLoading(false);
        })
    }

    useEffect(() => {
        setLoading(true);
        fetchFeedDetails(id);
    }, []);

    return (
        <div className="container" style={{ overflow: 'hidden' }}>
            <InvalidFeed />
            <h1 className="center title">
                {feedTitle}
            </h1>

            {isLoading ?

                <div className="col-12 text-center mt-5">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
                :
                feedList.map((item, index) => {
                    return (
                        <Card key={item.isoDate} className="my-2"
                            style={{
                                width: width,
                                height: height,
                                fontSize: fontSize
                            }}>
                            <Card.Header style={{ color: headlineColor }}>{item.title}</Card.Header>
                            <Card.Body>
                                <div
                                    style={{
                                        color: textColor,
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: item.content,
                                    }}>

                                </div>
                            </Card.Body>
                        </Card>
                    );
                })}
        </div>
    )
}

export default ViewFeed;