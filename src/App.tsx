import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar/NavBar';
import './App.css';

import FeedList from './components/FeedList/FeedList';
import ViewFeed from './components/ViewFeed/ViewFeed';

function App() {
  return (
    <>
      <Router>
          <NavBar></NavBar>
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
