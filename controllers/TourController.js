const TourGuide = require('../models/TourModel');

const createTourGuide = async (req, res) => {
  try {
    const { tourGuideId, email, password, name, gender, image_url, destinations, charges_per_day } = req.body;
    const newTourGuide = new TourGuide({
      tourGuideId,
      email,
      password,
      name,
      gender,
      image_url,
      destinations,
      charges_per_day
    });
    const savedTourGuide = await newTourGuide.save();
    res.status(201).json(savedTourGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const updateGuideProfile = async (req, res) => {
  try {
    const { name, gender, image_url, destinations, charges_per_day } = req.body;
    const updatedGuide = await TourGuide.findByIdAndUpdate(req.params.id, {
      name,
      gender,
      image_url,
      destinations,
      charges_per_day
    }, { new: true });
    res.json(updatedGuide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const JWT_SECRET = 'IRSHAADPROJECTBULC20232LAHOREKARACHI'; // Hardcoded secret key

const loginTourGuide = async (req, res) => {
  try {
    const { tourGuideId, email, password } = req.body;

    let user;

    // Check if tourGuideId is provided
    if (tourGuideId) {
      user = await TourGuide.findOne({ tourGuideId });
    } else if (email) { // If not, check if email is provided
      user = await TourGuide.findOne({ email });
    }

    // If user not found or password doesn't match, return error
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token with user's ID as payload
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // If authentication is successful, return success message, user data, and token
    res.json({ message: 'Login successful', user, token });
  } catch (error) {
    // If an error occurs, return error message
    res.status(500).json({ message: error.message });
  }
};


const getAllTourGuides = async (req, res) => {
  try {
    const tourGuides = await TourGuide.find();
    res.json(tourGuides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveTourGuide = async (req, res) => {
  try {
    const tourGuide = await TourGuide.findById(req.params.id);
    if (!tourGuide) return res.status(404).json({ message: 'Tour guide not found' });
    tourGuide.approved = true;
    await tourGuide.save();
    res.json({ message: 'Tour guide approved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTourGuideById = async (req, res) => {
  try {
    const tourGuide = await TourGuide.findById(req.params.id);
    if (!tourGuide) {
      return res.status(404).json({ success: false, error: 'Tour guide not found' });
    }
    res.status(200).json({ success: true, data: tourGuide });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateTourGuideById = async (req, res) => {
  try {
    const tourGuide = await TourGuide.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!tourGuide) {
      return res.status(404).json({ success: false, error: 'Tour guide not found' });
    }
    res.status(200).json({ success: true, data: tourGuide });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteTourGuideById = async (req, res) => {
  try {
    const tourGuide = await TourGuide.findByIdAndDelete(req.params.id);
    if (!tourGuide) {
      return res.status(404).json({ success: false, error: 'Tour guide not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createTourGuide,
  getAllTourGuides,
  getTourGuideById,
  updateTourGuideById,
  deleteTourGuideById,
  approveTourGuide,
  loginTourGuide,
  updateGuideProfile
};
