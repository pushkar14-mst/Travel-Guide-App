const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const app=express();
const dotenv=require('dotenv');
const passport=require('passport');
const cors=require('cors');
const LocalStrategy=require('passport-local').Strategy;
const jwt = require("jsonwebtoken");
const JwtStrategy=require('passport-jwt').Strategy;
const { ExtractJwt } = require("passport-jwt");
const bcrypt=require('bcrypt');
const session = require("express-session");
const nodemailer = require("nodemailer");
const {Client}=require('@duosecurity/duo_universal');

dotenv.config();

const duoClient=new Client({
  clientId:process.env.DUO_CLIENT_ID,
  clientSecret:process.env.DUO_CLIENT_SECRET,
  apiHost:process.env.DUO_HOST,
  redirectUrl:"http://localhost:8000/redirect",
})

app.use(
  session({
    secret: "f2feca#@425oI9",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(bodyParser.json());
dotenv.config();
const url=process.env.MONGO_ATLAS_URL;
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});

const userSchema=new mongoose.Schema({
    username:{type:String,unique:true},
    password:{type:String},
    name:{type:String},
});

const User=mongoose.model('User',userSchema);

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

app.post(
  "/login",
  passport.authenticate("local-login"),
  (req, res, next) => {
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
  }
);

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


app.post('/duo-auth',async(req,res)=>{
  const username=req.body.username;
  console.log("username coming for duo from client",username);
  // const password=req.body.password;
  if (!username ) {
    return res.status(400).json({ message: "Missing username" });
  }
 
    await duoClient.healthCheck();
    const state=duoClient.generateState();
    req.session.duo={state,username};
    console.log(req.session);
    const authUrl=duoClient.createAuthUrl(username,state);

    res.json({authUrl});
  
})

app.get('/redirect',async(req,res)=>{
  console.log("duo callback");
  res.send("Authenticated Successfully, Please close this tab and go back to the app");
  // const {query,session}=req;
  // const {duo_code,state}=query;
 
  // console.log(session);
  // if (!duo_code || !state) {
  //   return res.status(400).json({ message: "Missing duo_code or state" });
  // }
  // const savedState=session.duo?.state;
  // const username=session.duo?.username;
  // req.session.destroy();
  // if (state !== savedState) {
  //   return res.status(400).json({ message: "Invalid state" });
  // }
  // try {
  //   const decodedToken = await duoClient.exchangeAuthorizationCodeFor2FAResult(
  //       duo_code,
  //       session.duo?.username
  //     );
  
  //   if (result.status !== "allow") {
  //     return res.status(401).json({ message: "Access denied" });
  //   }
  //   res.json({message:"success",data:decodedToken});
    
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({message:"Internal Server Error"}); 
  // }
})
app.post("/reset-password", (req, res) => {
  let email = req.body.email;
  // console.log(email);
    
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  // Email configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD 
    }
  });

  // Function to send OTP to email address
  
  const OTP = generateOTP();

  const mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for verification is: ${OTP}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.json({ message: "OTP sent to your email" ,otp:OTP});
});

app.get("/logout", function (req, res) {
  req.session.destroy(function () {
    res.clearCookie("connect.sid"); //clears session id cookie
    res.json({ message: "logged out!!!" });
  });
})
app.get("/user/:username", (req, res) => {

  const username = req.params.username;
  User.findOne({ username: username }).then((user) => {
    res.json({ user: user });
  });
});
app.listen(8000,()=>{
    console.log("Server is running on port 8000");
});


app.post("/update-password", (req, res) => {
  const username = req.body.username;
  const newPassword = req.body.newPassword;
  let user=User.findOne({ username: username })
  if (!user) return console.log("user not found");
  user.password = bcrypt.hashSync(newPassword, 10);
  user.save();
  res.json({ message: "password changed successfully!" });
})