import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css'

import Header from './components/Header'
import BidItemDialog from './components/BidItemDialog';

import { ItemData, RootState } from './store/types';
import { setItems } from './store/itemsActions';

const App: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('ongoing'); // State to track the status filter

  const items = useSelector((state: RootState) => state.items); // Get the items from the Redux store

  const [showDialog, setShowDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);

  const filteredItems = items.filter((item) => item.status === statusFilter); // Filter items based on the selected status

  const dispatch = useDispatch();

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  const handleBid = (item: ItemData) => {
    setSelectedItem(item);
    setShowDialog(true);
  };

  const handleCancel = () => {
    setSelectedItem(null);
    setShowDialog(false);
  };

  const getItemsEndpoint = useSelector((state: RootState) => state.endpoints.getItemsEndpoint);

  useEffect(() => {
    // Make API request to loginEndpoint
    axios.get(getItemsEndpoint).then((response) => {
      // Assuming the response includes user data
      const items = response.data.items;
      // Dispatch the login action to update the Redux state
      dispatch(setItems(items));
    });
  }, []);

  return (
    <>
      <Header />
      <Container className="max-width-container">
        <div className="my-5">
          <Button variant="outline-primary" onClick={() => handleStatusFilter('ongoing')}>
            Ongoing
          </Button>{' '}
          <Button variant="outline-primary" onClick={() => handleStatusFilter('complete')}>
            Complete
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Current Price</th>
              <th>Duration</th>
              <th>Bid</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.itemId}>
                <td>{item.name}</td>
                <td>{item.highestBid}</td>
                <td>{item.startTime}</td>
                <td>
                  <Button onClick={() => handleBid(item)}>Bid</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Render the bid item dialog if selectedItem is not null */}
        {selectedItem && (
          <BidItemDialog item={selectedItem} show={showDialog} onCancel={handleCancel} />
        )}
      </Container>
    </>
  )
}

export default App
