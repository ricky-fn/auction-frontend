import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ItemCreation: React.FC = () => {
  const [itemName, setItemName] = useState('');
  const [startPrice, setStartPrice] = useState('');
  const [timeWindow, setTimeWindow] = useState('');
  const [itemNameError, setItemNameError] = useState<string | null>(null);
  const [startPriceError, setStartPriceError] = useState<string | null>(null);
  const [timeWindowError, setTimeWindowError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateItemName = (name: string): string | null => {
    if (!name.trim()) {
      return 'Item name cannot be empty.';
    }

    return null;
  };

  const validateStartPrice = (price: string): string | null => {
    const parsedPrice = parseInt(price, 10);

    if (!price.trim()) {
      return 'Start price cannot be empty.';
    }

    if (isNaN(parsedPrice) || parsedPrice <= 100) {
      return 'Start price must be a number greater than 100.';
    }

    return null;
  };

  const validateTimeWindow = (window: string): string | null => {
    const timeWindowRegex = /^\d+h$/;

    if (!window.trim()) {
      return 'Time window cannot be empty.';
    }

    if (!timeWindowRegex.test(window)) {
      return 'Time window must follow the format of Xh, e.g., 1h.';
    }

    return null;
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'itemName') {
      const itemNameError = validateItemName(value);
      setItemNameError(itemNameError);
    }

    if (name === 'startPrice') {
      const startPriceError = validateStartPrice(value);
      setStartPriceError(startPriceError);
    }

    if (name === 'timeWindow') {
      const timeWindowError = validateTimeWindow(value);
      setTimeWindowError(timeWindowError);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const itemNameError = validateItemName(itemName);
    const startPriceError = validateStartPrice(startPrice);
    const timeWindowError = validateTimeWindow(timeWindow);

    setItemNameError(itemNameError);
    setStartPriceError(startPriceError);
    setTimeWindowError(timeWindowError);

    if (!itemNameError && !startPriceError && !timeWindowError) {
      // Make API request or perform desired action
      // e.g., create the item
      console.log(itemName, startPrice, timeWindow)
    }
  };

  const handleCancel = () => {
    // Navigate back to the home page
    navigate('/');
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Create Item</h2>
        {itemNameError && <Alert variant="danger">{itemNameError}</Alert>}
        {startPriceError && <Alert variant="danger">{startPriceError}</Alert>}
        {timeWindowError && <Alert variant="danger">{timeWindowError}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="itemName">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              name="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onBlur={handleBlur}
            />
          </Form.Group>
          <Form.Group controlId="startPrice" className="mt-2">
            <Form.Label>Start Price</Form.Label>
            <Form.Control
              type="number"
              name="startPrice"
              value={startPrice}
              onChange={(e) => setStartPrice(e.target.value)}
              onBlur={handleBlur}
            />
          </Form.Group>
          <Form.Group controlId="timeWindow" className="mt-2">
            <Form.Label>Time Window (e.g., 1h)</Form.Label>
            <Form.Control
              type="text"
              name="timeWindow"
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value)}
              onBlur={handleBlur}
            />
          </Form.Group>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={handleCancel} className="mx-2">
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ItemCreation;