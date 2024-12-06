require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 2700;

// Middleware
app.use(cors());
app.use(express.json());

// DB Conected
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

// // UserSchema  
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    todolist: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Model
const User = mongoose.model("users", UserSchema);

// Read
app.get("/readalluser", async (req, res) => {
  try {
    const userData = await User.find({});
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

app.get("/read/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// Create
app.post("/createuser", async (req, res) => {
  try {
    const bodyData = req.body;
    const user = new User(bodyData);
    const userData = await user.save();
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

// Update
app.put("/updateuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// Delete
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete({ _id: id });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log("Port is Live on", { PORT });
});
