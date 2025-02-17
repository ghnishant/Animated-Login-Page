const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/formData', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const FormDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    subscribe: Boolean
});

const FormData = mongoose.model('FormData', FormDataSchema);

// Handle form submission
app.post('/submit', async (req, res) => {
    try {
        const { name, email, subscribe } = req.body;
        const newEntry = new FormData({ name, email, subscribe });
        await newEntry.save();
        res.status(201).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving data' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
