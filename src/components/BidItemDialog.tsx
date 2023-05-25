import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { ItemData, RootState } from '../store/types';

interface BidItemDialogProps {
  item: ItemData;
  show: boolean;
  onCancel: () => void;
}

const BidItemDialog: React.FC<BidItemDialogProps> = ({ item, show, onCancel }) => {
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { balance } = useSelector((state: RootState) => state.user);

  const { bidItemEndpoint } = useSelector((state: RootState) => state.endpoints);
  const handleSubmit = () => {
    if (!amount || isNaN(parseInt(amount)) || parseInt(amount) <= item.highestBid) {
      setErrorMessage(`Please enter an amount greater than ${item.highestBid}.`);
      return;
    }

    if (Number(amount) > (balance || 0)) {
      setErrorMessage(`Insufficient fund`);
      return;
    }

    // Make API request to depositEndpoint
    axios.post(bidItemEndpoint, { bidAmount: amount, itemId: item.itemId }).then(() => {
      console.log('abc')
    });


    // Clear form and error message
    setAmount('');
    setErrorMessage('');
  };

  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Bid for {item.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onBlur={() => {
                if (!amount || isNaN(amount) || parseInt(amount) <= item.highestBid) {
                  setErrorMessage(`Please enter an amount greater than ${item.highestBid}.`);
                } else {
                  setErrorMessage('');
                }
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BidItemDialog;