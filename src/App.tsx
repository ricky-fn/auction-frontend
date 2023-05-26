import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import axios from 'axios';

import Header from './components/Header'
import BidItemDialog from './components/BidItemDialog';

import { setItems } from './store/itemsActions';
import { RootState } from './store';
import { ItemData } from './store/ItemsReducer';

const App: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState(''); // State to track the status filter
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  const items = useSelector((state: RootState) => state.items); // Get the items from the Redux store

  const [showDialog, setShowDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);

  // Filter items based on the selected status
  const filteredItems = items.filter((item) => {
    if (statusFilter === '') {
      return true
    } else if (statusFilter === 'ongoing' && item.expirationTime * 1000 > Date.now()) {
      return true
    } else if (statusFilter === 'complete' && item.expirationTime * 1000 < Date.now()) {
      return true
    }
    return false
  });

  const dispatch = useDispatch();

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  const handleBid = (item: ItemData) => {
    if (!isLoggedIn) {
      return navigate("/login")
    }
    setSelectedItem(item);
    setShowDialog(true);
  };

  const handleCancel = () => {
    setSelectedItem(null);
    setShowDialog(false);
  };

  const getItemsEndpoint = useSelector((state: RootState) => state.endpoints.getItemsEndpoint);

  const formatDuration = (item: ItemData) => {
    const timestamp = item.timestamp;
    const expirationTime = item.expirationTime;

    const durationSeconds = expirationTime - timestamp;

    const hours = Math.floor(durationSeconds / 3600);
    const remainingSeconds = durationSeconds % 3600;
    const seconds = remainingSeconds % 60;

    let formattedDuration = `${hours}h`;

    if (seconds !== 0) {
      formattedDuration += `${seconds}s`;
    }

    return formattedDuration;
  };

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
          <Button
            variant={statusFilter === 'ongoing' ? 'primary' : 'outline-primary'}
            className="me-3"
            onClick={() => handleStatusFilter(statusFilter === 'ongoing' ? '' : 'ongoing')}
          >
            Ongoing
          </Button>
          <Button
            variant={statusFilter === 'complete' ? 'primary' : 'outline-primary'}
            onClick={() => handleStatusFilter(statusFilter === 'complete' ? '' : 'complete')}
          >
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
                <td>{item.highestBid}$</td>
                <td>{formatDuration(item)}</td>
                <td>
                  <Button disabled={item.expirationTime * 1000 < Date.now()} onClick={() => handleBid(item)}>Bid</Button>
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
