const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const ResourceRoute = require('./routes/resource_routes')

dotenv.config();
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Database..");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
      });
  })
  .catch((err) => console.log("Could not connect to the database", err));


app.get("/", (req, res) => {
  res.send("Hello there...");
});
app.use('/',ResourceRoute);
