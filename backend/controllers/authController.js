import authService from "../services/authService.js";

class AuthController {
  async register(req, res) {
    try {
      const { user, token } = await authService.registerUser(req.body);
      res
        .status(201)
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // secure in production
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
        .json({
          success: true,
          user,
          message: "User registered successfully",
        });
      console.log("new user register : ",user.name)
    } catch (err) {
      console.error(err.message);
      if (err.message === "User already exists") {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).send("Server error");
    }
  }

  // login controller
  async login(req, res) {
    try {
      const { user, token  } = await authService.loginUser(req.body);
      res
        .status(201)
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // secure in production
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
        .json({
          success: true,
          user,
          message: "User logged in successfully",
        });
      console.log("User login : ",user.name)
    } catch (err) {
      console.error(err.message);
      if (err.message === "Invalid credentials") {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).send("Server error");
    }
  }

  async getProfile(req, res) {
    try {
      const user = await authService.getUserProfile(req.user.id);
      res.json(user);
    } catch (err) {
      console.error(err.message);
      if (err.message === "User not found") {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).send("Server error");
    }
  }
  async logout(req, res) {
    try {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .json({
          success: true,
          message: "User logged out successfully",
        });
    console.log("User logout : ",req.user.id)
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
}

export default new AuthController();
