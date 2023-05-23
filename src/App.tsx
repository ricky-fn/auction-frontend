import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Table, Button } from 'react-bootstrap';
import { RootState } from './store/types';

import Header from './components/Header'
import './App.css'

const App:React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('ongoing'); // State to track the status filter

  const items = useSelector((state: RootState) => state.items); // Get the items from the Redux store
  
  const filteredItems = items.filter((item) => item.status === statusFilter); // Filter items based on the selected status

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  const handleBid = (itemId: string) => {
    // Implement your bid logic here
    console.log(`Bid clicked for item ${itemId}`);
  };

  return (
    <>
      <Header/>
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
                  <Button onClick={() => handleBid(item.itemId)}>Bid</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default App
