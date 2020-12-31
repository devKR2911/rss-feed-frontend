import { Spinner } from 'react-bootstrap';

function Loader() {
    return (
        <div className="loader-container">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loader;