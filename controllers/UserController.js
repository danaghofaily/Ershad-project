const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        
        // Check if the user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
        
        // Create a new user instance with the hashed password and provided role
        const newUser = new User({ username, email, password: hashedPassword, role });
        
        // Save the user to the database
        await newUser.save();
        
        return res.status(201).json({ newUser });
    } catch (error) {
        console.log("Error while creating the user", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const JWT_SECRET = 'IRSHADPROJECTPRINCESULTANUNIVERSITY2024';

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // If the password is correct, generate a JWT token using the hard-coded secret key
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Send the token back to the client
        res.status(200).json({ message: 'Login successful', token, type: user.role, username : user.username, user_id : user._id});
    } catch (error) {
        console.error('Error while logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const deleteUser = async (req, res) => {
    try {
        // Extract user ID from request parameters
        const userId = req.params.userId; // Use "userId" instead of "id"

        // Find the user by ID and delete it
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const updateUser = async (req, res) => {
    try {
        // Extract user ID from request parameters
        const userId = req.params.userId; // Use "userId" instead of "id"

        // Destructure the fields to update from the request body
        const { username, email, password } = req.body;

        // Check if the user with the provided ID exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields if they are provided in the request body
        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
            user.password = hashedPassword;
        }

        // Save the updated user to the database
        await user.save();

        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports={createUser,getUsers,deleteUser,updateUser,loginUser};