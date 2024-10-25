import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import multer from 'multer';
import fs from 'fs';
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = 'uploads/';
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});
mongoose
  .connect("mongodb://localhost:27017/signupDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  DOB: Date,
  phoneNumber: String,
  username: { type: String, required: false },
  password: { type: String, required: true },
  termsAndConditions: Boolean,
});
const mediaSchema = new mongoose.Schema({
  imgsrc: { type: String, required: true },
  title: { type: String, required: true },
  sname: { type: String, required: true },
  link: { type: String, required: false },
  videoUrl: { type: String, required: false },
});
const Media = mongoose.model("Media", mediaSchema);
app.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const { sname, title, imgsrc } = req.body;
    const videoUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const existingMedia = await Media.findOne({ sname });
    if (existingMedia) {
      await Media.updateOne({ sname }, { imgsrc, title, videoUrl });
    } else {
      const newMedia = new Media({ sname, title, imgsrc, videoUrl });
      await newMedia.save();
    }
    res.status(201).json({ message: 'Upload successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading media', details: error.message });
  }
});

app.get("/media", async (req, res) => {
  try {
    const mediaItems = await Media.find();
    res.status(200).json(mediaItems);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      details: error.message,
    });
  }
});
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
const Contact = mongoose.model("Contact", contactSchema);
app.post("/contact", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  try {
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      message,
    });
    await newContact.save();
    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      details: error.message,
    });
  }
});
const User = mongoose.model("User", userSchema);
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
app.post("/signup", async (req, res) => {
  const {
    name,
    email,
    gender,
    phoneNumber,
    username,
    password,
    termsAndConditions,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      gender,
      phoneNumber,
      username,
      password: hashedPassword,
      termsAndConditions,
      DOB: new Date(),
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      details: error.message,
    });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
