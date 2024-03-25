// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

// Initialize Express app
const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define mongoose schema
const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  address: { type: String }
});
const Resource = mongoose.model('Resource', resourceSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/resources', async (req, res) => {
  try {
    const newResource = new Resource(req.body);
    await newResource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/resources', async (req, res) => {
  try {
    const { page = 1, limit = 10, name, age, sort } = req.query;
    const query = {};
    if (name) query.name = name;
    if (age) query.age = age;
    const resources = await Resource.find(query)
                                    .sort(sort)
                                    .limit(limit * 1)
                                    .skip((page - 1) * limit)
                                    .exec();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/resources/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedResource = await Resource.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(updatedResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/resources/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResource = await Resource.findByIdAndDelete(id);
    if (!deletedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json({ message: 'Resource deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
