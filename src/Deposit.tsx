import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

import Header from './components/Header';
import { deposit } from './store/userActions';
import { setLoading, showToast } from './store/appActions';
import { DepositResponse } from './store/endpointsReducer';
import { RootState } from './store';

const Deposit = () => {
  const isLoggedIn = useAuth();

  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = () => {
    navigate('/');
  };

  const { depositEndpoint } = useSelector((state: RootState) => state.endpoints);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || isNaN(parseInt(amount)) || parseInt(amount) <= 0) {
      setErrorMessage('Please enter a valid amount.');
      return;
    }

    dispatch(setLoading(true))
    // Make API request to depositEndpoint
    axios.post(depositEndpoint, { amount }).then((response) => {
      const depositData: DepositResponse = response.data;
      dispatch(deposit(depositData.amount));
      dispatch(showToast({
        type: 'success',
        message: 'Deposit Request Done!'
      }))
    }).catch((error) => {
      console.log(error)
      dispatch(showToast({
        type: 'danger',
        message: 'Oops Something Wrong...'
      }))
    }).finally(() => {
      dispatch(setLoading(false))
    })

    // Clear form and error message
    setAmount('');
    setErrorMessage('');
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn])

  return (
    <>
      <Header />
      <Container>
        <h2 className="my-5">Deposit</h2>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onBlur={() => {
                if (!amount || isNaN(parseFloat(amount)) || parseInt(amount) <= 0) {
                  setErrorMessage('Please enter a valid amount.');
                } else {
                  setErrorMessage('');
                }
              }}
            />
          </Form.Group>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={handleCancel} className="mx-2">
              Cancel
            </Button>
            <Button type="submit">Deposit</Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Deposit;