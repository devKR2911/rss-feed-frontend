import NavBar from './components/nav-bar/NavBar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import FeedList from './components/feed-list/FeedList';
import ViewFeed from './components/view-feed/ViewFeed';

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Router>
          <Switch>
              <Route path="/:id">
                  <ViewFeed />
              </Route>
              <Route path="/">
                  <FeedList />
              </Route>
          </Switch>
      </Router>
    </>
  );
}

export default App;
