import { useEffect, useState } from 'react';
import { Card, Alert } from 'react-bootstrap';
import RSSParser from 'rss-parser';
import { httpGet } from '../../services/axios';
import { useParams } from "react-router-dom";
import { CORS_PROXY } from '../../services/const';
import Loader from '../Loader/Loader';

let parser = new RSSParser();

function ViewFeed() {
    let { id } = useParams();
    const [feedTitle, setFeedTitle]: [string, any] = useState('');
    const [feedImage, setFeedImage]: [string, any] = useState('');
    const [feedList, setFeedList]: [any, any] = useState([]);
    const [textColor, setTextColor]: [any, any] = useState('');
    const [backgroundColor, setBackgroundColor]: [any, any] = useState('');
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
                const feed = response.data.feed;
                fetchFeed(feed.url);
                setTextColor(feed.textColor);
                setHeadlineColor(feed.headlineColor);
                setBackgroundColor(feed.backgroundColor);
                setFontSize(feed.fontSize + 'px');
                setHeight(feed.height + 'px');
                setWidth(feed.width + 'px');
            })
            .catch((error) => {
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
            if (feed.image && feed.image.url) {
                setFeedImage(feed.image.url);
            }
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
            <div className="row">
                <div className="col px-5 pt-2">
                    <h4 className="center title">
                        {feedImage ? <img src={feedImage} className="mr-2" alt="" /> : <div></div>}
                        {feedTitle}
                    </h4>
                </div>
            </div>

            {isLoading ?
                <Loader />
                :
                <div className="d-flex flex-wrap justify-content-center">
                    {feedList.map((item, index) => {
                        return (
                            <Card key={item.isoDate} className="m-3 shadow-card truncated-card"
                                style={{
                                    backgroundColor: backgroundColor,
                                    maxWidth: width,
                                }}>
                                <Card.Header style={{
                                    color: headlineColor,
                                    fontSize: fontSize
                                }}>{item.title}</Card.Header>
                                <Card.Body>
                                    {item && item.enclosure && item.enclosure.url ?
                                        <div className="col-12 d-flex justify-content-center">
                                            <img
                                                src={item.enclosure.url}
                                                alt=""
                                                className="img-fluid feed-img" />
                                        </div> : <div></div>
                                    }
                                    <div
                                        className="mt-2"
                                        style={{
                                            height: height,
                                            fontSize: fontSize,
                                            color: textColor,
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: item.content,
                                        }}>

                                    </div>
                                </Card.Body>
                            </Card>
                        );
                    })
                    }
                </div>
            }
        </div>
    )
}

export default ViewFeed;