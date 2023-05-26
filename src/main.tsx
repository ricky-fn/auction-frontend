import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

import App from './App.tsx'
import AuthForm from './Auth.tsx';
import ItemCreation from './ItemCreation.tsx';
import Deposit from './Deposit.tsx';
import Loading from './components/Loading.tsx';
import ToastMessage from './components/ToastMessage.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Loading />
    <ToastMessage />
    <Router>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/create-item" element={<ItemCreation />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </Provider>,
)
