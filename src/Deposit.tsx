import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

import Header from './components/Header';

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!amount || isNaN(parseInt(amount)) || parseInt(amount) <= 0) {
      setErrorMessage('Please enter a valid amount.');
      return;
    }

    // Proceed with deposit logic (e.g., API request)
    console.log(amount)

    // Clear form and error message
    setAmount('');
    setErrorMessage('');
  };

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
                if (!amount || isNaN(amount) || parseInt(amount) <= 0) {
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
            <Button type="submit">Create</Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Deposit;