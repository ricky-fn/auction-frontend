import { ToastContainer, Toast } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { hideToast } from "../store/appActions"
import { RootState } from "../store"

const ToastMessage = () => {
  const appData = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch();

  return (
    <ToastContainer className="p-3" position="bottom-end">
      <Toast onClose={() => dispatch(hideToast())} bg={appData.toastType} show={appData.showToast} delay={3000} autohide>
        <Toast.Body className="text-white">{appData.toastMessage}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;