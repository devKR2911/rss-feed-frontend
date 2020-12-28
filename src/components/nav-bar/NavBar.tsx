import { Navbar } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import FeedList from '../feed-list/FeedList';

function NavBar() {
    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>RSS Feed</Navbar.Brand>
            </Navbar>
            <Switch>
                <Route path="/">
                    <FeedList />
                </Route>
            </Switch>
        </Router>
    );
}

export default NavBar;