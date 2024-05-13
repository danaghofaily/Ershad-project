import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove JWT token from local storage
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#b38f51'}}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#dec9a6' }}>
        <div className="container">
          <NavLink className="navbar-brand" exact to="/">Home</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/places">Destinations</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/guides">Tour Guides</NavLink>
              </li>
             
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">Login as Guide</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/adminlogin">Admin</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/review">Give Your Review</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/list">view Guide Reviews</NavLink>
              </li>
              {isAuthenticated ? (
                <li className="nav-item" onClick={handleLogout}>
                  <NavLink className="nav-link" to="/">Logout</NavLink>
                </li>
              ) : (
                ''
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <div className="logo">
              <img src="iLogo.png" alt="Logo" className="img-fluid" />
            </div>
            <h1 className="welcome-message">Welcome, Ershad!</h1>
            <p className="info">Explore the beauty of Saudi Arabia. From the vast deserts to the stunning Red Sea coast, Saudi Arabia offers a rich tapestry of culture, history, and natural wonders.</p>
          </div>
        </div>
        <br/>
        <h3 style={{textAlign:'center'}}>Famous Places to visit</h3>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <img src="https://c.myholidays.com/blog/blog/content/images/2020/10/Al-Masmak-Fort.webp" alt="Place 1" className="card-img-top" style={{ height: '300px', width: '415px', margin: '0 auto' }} />
              <div className="card-body">
                <p className="card-text">Al Masmak Fort</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src="https://c.myholidays.com/blog/blog/content/images/2020/10/A-Cosmopolitan-Delight-in-Saudi-Arabia.webp" alt="Place 2" className="card-img-top" style={{ height: '300px', width: '415px', margin: '0 auto' }} />
              <div className="card-body">
                <p className="card-text">A Cosmopolitan Delight In Saudi Arabia</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src="https://c.myholidays.com/blog/blog/content/images/2021/10/Half-Moon-Bay.webp" alt="Place 3" className="card-img-top" style={{ height: '300px', width: '415px', margin: '0 auto' }} />
              <div className="card-body">
                <p className="card-text">Bay Moon</p>
              </div>
            </div>
          </div>
          {/* Add more cards as needed */}
        </div>

        <div className="row justify-content-center mt-5" style={{backgroundColor: '#b38f51'}}>
  <div className="col-md-8" style={{backgroundColor: '#b38f51'}}>
    <div className="card" style={{backgroundColor: '#b38f51'}}>
      <div className="card-body" style={{ backgroundColor: '#b38f51'}}>
        <h2 className="card-title">Activities</h2>
        <div className="row" style={{ backgroundColor: '#b38f51'}}>
          <div className="col-md-4" style={{ backgroundColor: '#b38f51'}}>
            <div className="card" style={{ backgroundColor: '#b38f51'}}>
              <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/db/f8/a6.jpg" className="card-img-top" alt="Activity 1" style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
              <div className="card-body">
                <p className="card-text text-center" style={{fontWeight:'bold'}}>Camel Riding</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ backgroundColor: '#b38f51'}}>
              <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0b/ba/42/12.jpg" className="card-img-top" alt="Activity 2" style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
              <div className="card-body">
                <p className="card-text text-center" style={{fontWeight:'bold'}}>Quad Biking</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ backgroundColor: '#b38f51'}}>
              <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/76/6f/45/caption.jpg?w=300&h=300&s=1" className="card-img-top" alt="Activity 3" style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
              <div className="card-body">
                <p className="card-text text-center" style={{fontWeight:'bold'}}>Celebration of Saudi</p>
              </div>
            </div>
          </div>
          {/* Add more activities as needed */}
        </div>
      </div>
    </div>
  </div>
</div>




<div className="row justify-content-center mt-5 text-center">
  <div className="col-md-6">
    <div className="card">
      <div className="card-body" style={{ backgroundColor: '#b38f51'}}>
        <h2 className="card-title">Contact Us</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="5"></textarea>
          </div>
          <button type="submit" className="btn btn-dark">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>
<div className="row justify-content-center mt-5" style={{backgroundColor: '#b38f51'}}>
  <div className="col-md-8" style={{backgroundColor: '#b38f51'}}>
    <div className="card" style={{backgroundColor: '#b38f51'}}>
      <div className="card-body" style={{backgroundColor: '#b38f51'}}>
        <h2 className="card-title">Our Team</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center" style={{backgroundColor: '#b38f51'}}>
              <img src="https://images.unsplash.com/photo-1573165850883-9b0e18c44bd2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top rounded-circle" alt="Team Member 1" style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
              <div className="card-body" style={{backgroundColor: '#b38f51'}}>
                <h5 className="card-title">John Doe</h5>
                <p className="card-text">Position: CEO</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center" style={{backgroundColor: '#b38f51'}}>
              <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top rounded-circle" alt="Team Member 2" style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">Jane Smith</h5>
                <p className="card-text">Position: Marketing Director</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center" style={{backgroundColor: '#b38f51'}}>
              <img src="https://plus.unsplash.com/premium_photo-1661778544419-41b124812d7c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top rounded-circle" alt="Team Member 3" style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
              <div className="card-body" style={{backgroundColor: '#b38f51'}}>
                <h5 className="card-title">Michael Johnson</h5>
                <p className="card-text">Position: Operations Manager</p>
              </div>
            </div>
          </div>
          {/* Add more team members as needed */}
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Footer */}
      <footer className="text-center py-3 mt-5" style={{backgroundColor:'#dec9a6'}}>
        <p>&copy; 2024 Ershaad. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
}

export default Home;
