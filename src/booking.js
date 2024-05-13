import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const CardWrapper = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
`;

const StyledCard = styled.div`
  background-color: #e2e3e5;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const CardTitle = styled.h5`
  color: #212529;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 auto;
  display: block;
  &:hover {
    background-color: #0056b3;
  }
`;

function AddTouristInfoPage() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate form submission success
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      navigate('/'); // Redirect to the home page
    }, 3000); // Redirect after 3 seconds
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Enter The Details</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            {/* Personal Information Card */}
            <CardWrapper>
              <StyledCard>
                <CardTitle>Personal Information</CardTitle>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Meetup location</label>
                  <input type="text-area" className="form-control" id="email" required />
                </div>
              </StyledCard>
            </CardWrapper>
            {/* Payment Information Card */}
          
            <SubmitButton type="submit">Submit</SubmitButton>
          </form>

        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <ModalContainer>
          <ModalContent>
            <h4>Booking Request Receieved</h4>
            <p>Redirecting to Home Page...</p>
          </ModalContent>
        </ModalContainer>
      )}
    </div>
  );
}

export default AddTouristInfoPage;
