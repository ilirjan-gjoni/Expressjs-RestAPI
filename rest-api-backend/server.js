const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://mongo-service/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// Create a schema for the name and surname
const personSchema = new mongoose.Schema({
  name: String,
  surname: String,
});

// Create a model based on the schema
const Person = mongoose.model('Person', personSchema);

// Parse JSON bodies for POST requests
app.use(express.json());

app.use(cors());


// Handle POST requests to /people
app.post('/people', async (req, res) => {
  try {
    // Create a new person using the Person model and the request body
    const person = new Person(req.body);

    // Save the person to the database
    await person.save();

    // Send a response with the saved person
    res.status(201).json(person);
  } catch (error) {
    // If an error occurs, send a 500 response with the error message
    res.status(500).json({ error: error.message });
  }
});

// Handle GET requests to /people
app.get('/people/all', async (req, res) => {
  try {
    // Retrieve all people from the database
    const people = await Person.find();

    // Send a response with the retrieved people
    res.status(200).json(people);
  } catch (error) {
    // If an error occurs, send a 500 response with the error message
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
