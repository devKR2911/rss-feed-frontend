import { Toast } from 'react-bootstrap';

function ToastContainer({ showToast, onToastClose, title, message }) {
  return (
    <>
      <Toast
            style={{
              position: 'absolute',
              top: 20,
              right: 0,
            }}
            autohide={true}
            onClose={onToastClose}
            show={showToast}>
          <Toast.Header>
            <strong className="mr-auto">
              {title}
            </strong>
          </Toast.Header>
          <Toast.Body>
            {message}
          </Toast.Body>
        </Toast>
    </>
  );

}

export default ToastContainer;