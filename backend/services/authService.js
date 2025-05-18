import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {User} from '../models/Models.js';

class AuthService {
  async registerUser(userData) {
    const { name, email, password } = userData;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      throw new Error('User already exists');
    }
    // Create new user
    user = new User({
      name,
      email,
      password
    });

    // Save user to database
    await user.save();

    // Generate token
    const token = this.generateToken(user._id);
    return { user, token };
  }

  async loginUser(credentials) {
    const { email, password } = credentials;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user.id);
    return { user, token };
  }

  async getUserProfile(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  generateToken(userId) {
    return new Promise((resolve, reject) => {
      const payload = {
        user: {
          id: userId
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        }
      );
    });
  }
}

export default new AuthService();