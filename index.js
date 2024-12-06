const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 2700;

// Middleware
app.use(cors());
app.use(express.json());

// DB Conected
mongoose
  .connect(
    "mongodb+srv://devsmi168:dishant@todosclouster.zzatr.mongodb.net/?retryWrites=true&w=majority&appName=todosclouster"
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Error", err);
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
  console.log(`Server Is Started in ${PORT}`);
});
