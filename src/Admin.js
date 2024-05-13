import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom/dist';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #dec9a6;
  color: #fff;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

function AdminPage() {
  const [tourGuides, setTourGuides] = useState([]);

  useEffect(() => {
    fetchTourGuides();
  }, []);

  const fetchTourGuides = async () => {
    try {
      const response = await axios.get('http://localhost:3019/api/tour-guides');
      setTourGuides(response.data);
    } catch (error) {
      console.error('Error fetching tour guides:', error);
    }
  };

  const handleApprove = async (tourGuideId) => {
    try {
      await axios.put(`http://localhost:3019/api/tour-guides/${tourGuideId}/approve`);
      fetchTourGuides(); // Refresh tour guides after approval
      alert('Tour guide approved successfully!');
    } catch (error) {
      console.error('Error approving tour guide:', error);
    }
  };

  return (
    <div>
      <NavLink to='/home'><button style={{textAlign:'center'}}>Logout</button></NavLink>
      <h2 style={{textAlign:'center'}}> Guide Approval </h2>
      <div className='text-center'>
         <NavLink to='/del'><button>Manage Reviews</button></NavLink>
      </div>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Gender</Th>
            <Th>Destinations</Th>
            <Th>Charges Per Day</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {tourGuides.map(tourGuide => (
            <tr key={tourGuide._id}>
              <Td>{tourGuide.name}</Td>
              <Td>{tourGuide.gender}</Td>
              <Td>{tourGuide.destinations}</Td>
              <Td>{tourGuide.charges_per_day}</Td>
              <Td>
                {!tourGuide.approved && (
                  <button onClick={() => handleApprove(tourGuide._id)}>Approve</button>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminPage;
