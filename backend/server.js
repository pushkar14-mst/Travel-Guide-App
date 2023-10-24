const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require("cors");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const bcrypt = require("bcrypt");
const session = require("express-session");
const nodemailer = require("nodemailer");
const { Client } = require("@duosecurity/duo_universal");

dotenv.config();

const duoClient = new Client({
  clientId: process.env.DUO_CLIENT_ID,
  clientSecret: process.env.DUO_CLIENT_SECRET,
  apiHost: process.env.DUO_HOST,
  redirectUrl: "http://localhost:8000/redirect",
});

app.use(
  session({
    secret: "f2feca#@425oI9",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
dotenv.config();
const url = process.env.MONGO_ATLAS_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  name: { type: String },
});

const hotelSchema = new mongoose.Schema({
  no_of_rooms: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  location: {
    type: String,
  },
  price: {
    type: String,
  },
  no_of_hotel: {
    type: String,
  },
  available_of_rooms: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const TourGuideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  fullName: {
    type: String,
    required: true,
  },
  eMail: {
    type: String,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  nicNumber: {
    type: String,
  },
  amount: {
    type: String,
  },
  workExperience: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("User", userSchema);
const Hotel = mongoose.model("Hotel", hotelSchema);
const TourGuide = mongoose.model("TourGuide", TourGuideSchema);
app.post("/register", async (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  let password = req.body.password;

  const takenUsername = User.findOne({ username: username });

  if (!takenUsername) {
    res.json({
      message:
        "Sorry the username is already taken, please try something different",
    });
  } else {
    password = await bcrypt.hash(password, 10);
    const user = new User({ name, username, password });
    console.log(user);
    await user.save();
    res.json({ message: "success" });
  }
});

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) return done(null, false);
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false); // if passwords match return user
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error, false);
      }
    }
  )
);

app.post("/login", passport.authenticate("local-login"), (req, res, next) => {
  console.log(req.body);
  // login
  jwt.sign(
    { user: req.body },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
    (err, token) => {
      if (err) {
        return res.json({
          message: "Failed to login",
          token: null,
        });
      }
      const loggedInUser = jwt.decode(token).user.username;

      User.findOne({ username: loggedInUser }).then((user) => {
        res.json({
          isAuthenticated: true,
          token,
          user,
        });
      });
    }
  );
});

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
      password: user.password,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      //   console.log(jwtPayload);
      User.findOne({ username: jwtPayload.username }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);

app.post("/duo-auth", async (req, res) => {
  const username = req.body.username;
  console.log("username coming for duo from client", username);
  // const password=req.body.password;
  if (!username) {
    return res.status(400).json({ message: "Missing username" });
  }

  await duoClient.healthCheck();
  const state = duoClient.generateState();
  req.session.duo = { state, username };
  console.log(req.session);
  const authUrl = duoClient.createAuthUrl(username, state);

  res.json({ authUrl });
});

app.get("/redirect", async (req, res) => {
  console.log("duo callback");
  res.send(
    "Authenticated Successfully, Please close this tab and go back to the app"
  );
});
app.post("/reset-password", (req, res) => {
  let email = req.body.email;
  // console.log(email);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  // Email configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // Function to send OTP to email address

  const OTP = generateOTP();

  const mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for verification is: ${OTP}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.json({ message: "OTP sent to your email", otp: OTP });
});
app.post("/update-password", (req, res) => {
  const username = req.body.username;
  const newPassword = req.body.newPassword;
  let user = User.findOne({ username: username });
  if (!user) return console.log("user not found");
  user.password = bcrypt.hashSync(newPassword, 10);
  user.save();
  res.json({ message: "password changed successfully!" });
});
app.get("/logout", function (req, res) {
  req.session.destroy(function () {
    res.clearCookie("connect.sid"); //clears session id cookie
    res.json({ message: "logged out!!!" });
  });
});
app.get("/user/:username", (req, res) => {
  const username = req.params.username;
  User.findOne({ username: username }).then((user) => {
    res.json({ user: user });
  });
});

/* Hotel Operations */
app.post("/add-hotel", async (req, res) => {
  let no_of_rooms = req.body.hotel_no_of_rooms;
  let hotel_name = req.body.hotel_name;
  let hotel_type = req.body.hotel_type;
  let hotel_location = req.body.hotel_location;
  let hotel_price = req.body.hotel_price;
  // console.log(no_of_rooms, hotel_name, hotel_type, hotel_location, hotel_price);
  const checkIfHotelExist = await Hotel.findOne({ name: hotel_name });
  if (checkIfHotelExist) {
    return res.json({ message: "Hotel already exist" });
  }
  try {
    let hotel = new Hotel({
      no_of_rooms: no_of_rooms,
      name: hotel_name,
      type: hotel_type,
      location: hotel_location,
      price: hotel_price,
    });
    await hotel.save();
    res.json({ message: "Restaurant Added Successfully" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/all-hotels", async (req, res) => {
  const hotels = await Hotel.find();
  res.json({ hotels: hotels });
});

/*Tour Guide Ops */

app.post("/add-tourguide", async (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  let address = req.body.address;
  let dob = req.body.dob;
  let mobile = req.body.mobile;
  let gender = req.body.gender;
  let NIC = req.body.NIC;
  let email = req.body.email;
  let experience = req.body.experience;
  let amount = req.body.amount;
  const checkIfTourGuideExists = await TourGuide.findOne({ nicNumber: NIC });
  if (checkIfTourGuideExists) {
    return res.json({ message: "Tour Guide already exist" });
  }
  try {
    let tourGuide = new TourGuide({
      fullName: name,
      eMail: email,
      address: address,
      gender: gender,
      age: age,
      dateOfBirth: dob,
      contactNumber: mobile,
      nicNumber: NIC,
      amount: amount,
      workExperience: experience,
    });
    await tourGuide.save();
    res.json({ message: "Tour Guide Added Successfully" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/all-tourguides", async (req, res) => {
  const tourguides = await TourGuide.find();
  res.json({ tourguides: tourguides });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
