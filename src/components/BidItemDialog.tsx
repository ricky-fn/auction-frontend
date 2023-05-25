import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ItemData } from '../store/types';

interface BidItemDialogProps {
  item: ItemData;
  show: boolean;
  onCancel: () => void;
}

const BidItemDialog: React.FC<BidItemDialogProps> = ({ item, show, onCancel }) => {
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    // Validation
    if (!amount || isNaN(parseInt(amount)) || parseInt(amount) <= item.highestBid) {
      setErrorMessage(`Please enter an amount greater than ${item.highestBid}.`);
      return;
    }

    // Proceed with bid logic (e.g., API request)

    // Clear form and error message
    setAmount('');
    setErrorMessage('');

    // Dismiss the dialog
  };

  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Bid for {item.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <div className="error">{errorMessage}</div>}
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