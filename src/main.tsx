import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.tsx'
import AuthForm from './Auth.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        {/* <Route path="/create-item" element={<CreateItemPage />} />
        <Route path="/deposit" element={<DepositPage />} /> */}
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </Provider>,
)
