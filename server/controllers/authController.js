import jwt from "jsonwebtoken";
import User from "../models/User.js";

function signToken(userId) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function userResponse(user) {
  return {
    id: user._id,
    fullName: user.fullName,
    name: user.fullName,
    email: user.email,
    streak: user.streak ?? 0,
  };
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function register(req, res, next) {
  try {
    const fullName = (req.body.fullName || req.body.name || "").trim();
    const email = (req.body.email || "").trim().toLowerCase();
    const { password } = req.body;

    if (!fullName) return res.status(400).json({ message: "Full name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!emailRegex.test(email)) return res.status(400).json({ message: "Invalid email address" });
    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const user = await User.create({ fullName, email, password });
    const token = signToken(user._id);
    return res.status(201).json({ token, user: userResponse(user) });
  } catch (err) {
    return next(err);
  }
}

export async function login(req, res, next) {
  try {
    const email = (req.body.email || "").trim().toLowerCase();
    const { password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user._id);
    return res.json({ token, user: userResponse(user) });
  } catch (err) {
    return next(err);
  }
}

export async function me(req, res) {
  res.json({ user: userResponse(req.user) });
}
