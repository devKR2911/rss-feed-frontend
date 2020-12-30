import { Navbar } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRssSquare } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand href="/">
                <FontAwesomeIcon icon={faRssSquare} className="mr-2" />
                RSS Feed
            </Navbar.Brand>
        </Navbar>
    );
}

export default NavBar;