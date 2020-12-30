import { Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <Navbar bg="light"  sticky="top"  variant="dark" expand="lg">
            <Navbar.Brand >
                <Link to="/">RSS Feed</Link>
            </Navbar.Brand>
        </Navbar>
    );
}

export default NavBar;