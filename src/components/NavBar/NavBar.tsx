import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">RSS Feed</Navbar.Brand>
        </Navbar>
    );
}

export default NavBar;