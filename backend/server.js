
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Initialize the app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define a Schema and Model
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  address: String,
});

const FormData = mongoose.model('FormData', formSchema);

// Route to submit form data
app.post('/api/submit', async (req, res) => {
  const { name, email, mobile, address } = req.body;

  const newForm = new FormData({ name, email, mobile, address });

  try {
    await newForm.save();
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Error saving data' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
