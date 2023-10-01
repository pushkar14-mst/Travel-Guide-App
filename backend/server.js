const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const app=express();
const dotenv=require('dotenv');
const passport=require('passport');
const cors=require('cors');
const LocalStrategy=require('passport-local').Strategy;
const JwtStrategy=require('passport-jwt').Strategy;
const { ExtractJwt } = require("passport-jwt");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://127.0.0.1:3000",
}));
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
  console.log(name, username, password);
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

        console.log(password);
        console.log(user.password);
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
      console.log(jwtPayload);
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

app.listen(8000,()=>{
    console.log("Server is running on port 8000");
});
