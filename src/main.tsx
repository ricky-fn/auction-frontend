import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/create-item" element={<CreateItemPage />} />
        <Route path="/deposit" element={<DepositPage />} /> */}
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </Provider>,
)
