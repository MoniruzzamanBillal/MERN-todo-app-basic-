const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const listModel = require("./DataModel/ListModel");
const asynchandler = require("express-async-handler");

const app = express();
const port = 4000;

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.wng5cg8.mongodb.net/Test-backend?retryWrites=true&w=majority"
);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/users", async (req, res) => {
  try {
    const data = await listModel.find();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/newTask", async (req, res) => {
  try {
    const newItem = req.body;
    const newList = new listModel(newItem);
    await newList.save();
    res.send(newList);
  } catch (error) {
    console.log(error);
  }
});

app.put("/update", async (req, res) => {
  const id = req.body.id;
  const newList = req.body.newList;

  const updatedInfo = await listModel.findById(id);
  if (updatedInfo) {
    updatedInfo.liItems = newList;
    await updatedInfo.save();
    res.send(updatedInfo);
  }
});

app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  await listModel.findByIdAndRemove(id).exec();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// compass
// mongodb+srv://admin:admin@cluster0.wng5cg8.mongodb.net/
