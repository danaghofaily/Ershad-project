import { BrowserRouter , Route, Routes } from 'react-router-dom';
import AdminPage from './Admin';
import Login from './Login';
import AddTouristInfoPage from './booking';
import SignUp from './Register';
import Home from './Home';
import TourGuideProfile from './TourGuideProfile';
import TourGuideForm from './TourRegister';
import AllGuidesPage from './GetGuide';
import Adminchat from './adminchat';
import PlacesList from './Destinations';
import AdminLogin from './Adminlogin';
import ReviewForm from './Review';
import ReviewList from './Reviewlist';
import ReviewList2 from './ManageReview';
function App() {
  return (
    <>

      <BrowserRouter>
    
        <Routes>
          <Route exact path="/" element={<Login />} /> 
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/register" element={<TourGuideForm />} />
          <Route exact path="/admin" element={<AdminPage />} />
          <Route exact path="/guides" element={<AllGuidesPage />} />
          <Route exact path="/profile" element={<TourGuideProfile />} />
          <Route exact path="/booking" element={<AddTouristInfoPage />} />
          <Route exact path="/chat" element={<Adminchat />} />
          <Route exact path="/places" element={<PlacesList />} />
          <Route exact path="/adminlogin" element={<AdminLogin />} />
          <Route exact path="/review" element={<ReviewForm />} />
          <Route exact path="/list" element={<ReviewList />} />
          <Route exact path="/del" element={<ReviewList2 />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
