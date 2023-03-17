const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const Post = require("./models/Post");

const multer = require("multer");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const { info } = require("console");
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
// configure Multer to store uploaded files in a folder named 'uploads'
const uploadMiddleware = multer({ dest: "uploads/" });
// WfKrSMlewnwuTRLu mongo atlast pass

// const upload = multer({ storage: storage });
// connecting mongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/myLoginReg", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err.message);
  });
//creating user schema

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: { type: String },
});

//creating a user model

const user = mongoose.model("User", userSchema);

//configuring middleware
// app.use(express.json());
// app.use(cors({credentials:true,origin:'http://localhost:3000'}));

//Handling sign-up
const secret = "mysecretkey";

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //emcripting the password
    //using salt->A salt is a thing in cryptography a salt is randomly generated value that will join with our password, eg if our password is 1234 a salt might get attach to this password making it A1B2C3D4 and now this salt will be sended forward for encrypttion , this makes our encription more secure , NOTE: PASSWORD CAN BE ENCRYPTED WITHOUT SALT BUT SALTED PASSWORD IS JUST MORE SECURE AND HARD TO CRACK
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user
      .findOne({ email: email })
      .then((existingUser) => {
        if (existingUser) {
          return res
            .status(409)
            .json({ message: "User already exists with this email address." });
        }

        // Creating a new user
        const newUser = new user({
          name,
          email,
          password: hashedPassword,
        });

        // Saving the user to the database
        newUser
          .save()
          .then((savedUser) => {
            return res
              .status(201)
              .json({ message: "User created successfully", user: savedUser });
          })
          .catch((err) => {
            console.error(err);
            return res
              .status(500)
              .json({ message: "An error occurred while saving the user." });
          });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({
          message: "An error occurred while checking for existing user.",
        });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.json("Hello world");
});

//Handle user login

app.post("/login", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //Finding the user with email
    const Ouruser = await user.findOne({ email, name });
    if (!Ouruser) {
      return res.status(400).json({ message: "Invalid" });
    }

    //Comparing pass
    const isMatch = await bcrypt.compare(password, Ouruser.password);
    if (!isMatch) {
      //log in
      res.status(400).json({ message: error.message });
    } else {
      jwt.sign({ name, id: Ouruser._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: Ouruser._id,
          name,
        });
      });
    }
    // res.json({ message: "Login success" });
    // res.status(200).json({ message: "Login success" });
  } catch (error) {
    res.status(400).json({ message: error.message + "catch" });
  }
});

app.get("/set-cookie", (req, res) => {
  res.cookie("myCookie", "myValue", {
    httpOnly: true,
  });
  res.send("Cookie set!");
});

//profile
app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    // const { username } = decoded;
    // res.json({ username });
    res.json(info);
  });
});

//logout
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

//createpost
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
    // res.json(info);
  });
});

//post get
app.get("/post", async (req, res) => {
  // const posts=
  res.json(
    await Post.find()
      .populate("author", ["name"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get('/post/:id', async(req,res)=>{
  const {id}=req.params;
//  await Post.findById(id);
 const postDoc=await Post.findById(id).populate('author',['name'])

})

//start server
app.listen(5000, () => {
  console.log("Server listening to port 5000");
});