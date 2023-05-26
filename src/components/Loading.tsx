import { Spinner } from "react-bootstrap"
import { useSelector } from "react-redux"
import { RootState } from "../store"

const Loading = () => {
  const appState = useSelector((state: RootState) => state.app)
  if (!appState.isLoading) return null
  return (
    <div className="spinner-container">
      <Spinner animation="border" variant="primary" role="status" />
      <p className="text-white ms-4 mb-0">Please wait for loading...</p>
    </div>
  )
}

export default Loading;