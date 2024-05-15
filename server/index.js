// app.mjs (Express.js)

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
try {
    await mongoose.connect('mongodb+srv://diwakargiri234:Diwakar12345@diwakar.rjvg5fh.mongodb.net/voting_app');
    console.log("Connected to MongoDB");
} catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
}

// Define MongoDB schema and model
const voteSchema = new mongoose.Schema({
    initialized: { type: Boolean, default: false }, // Add initialization flag
    optionA: { type: Number, default: 0 },
    optionB: { type: Number, default: 0 },
    optionAName: { type: String, default: "JavaScript" }, // Add name for option A
    optionBName: { type: String, default: "Python" }, // Add name for option B
});

const Vote = mongoose.model('Vote', voteSchema);

app.get('/initialize', async (req, res) => {
    try {
        const existingVote = await Vote.findOne({});
        if (existingVote && existingVote.initialized) {
            return res.status(400).json({ message: 'Database is already initialized' });
        }
        await Vote.deleteMany({});
        await Vote.create({ initialized: true }); // Set initialized flag
        res.status(200).json({ message: 'Database initialized' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.post('/vote', async (req, res) => {
    try {
        const { option } = req.body;
        const existingVote = await Vote.findOne({});
        if (existingVote) {
            if (option === 'JavaScript') { // Use option name instead of 'optionA'
                existingVote.optionA += 1;
            } else if (option === 'Python') { // Use option name instead of 'optionB'
                existingVote.optionB += 1;
            }
            await existingVote.save(); // Save the updated vote data
        }
        res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while recording your vote' });
    }
});

// Retrieve vote counts
app.get('/results', async (req, res) => {
    try {
        const vote = await Vote.findOne({});
        if (!vote) {
            return res.status(404).json({ error: 'No vote data found' });
        }
        const totalVotes = vote.optionA + vote.optionB;
        const optionAPercentage = (vote.optionA / totalVotes) * 100;
        const optionBPercentage = (vote.optionB / totalVotes) * 100;
        const optionAName = vote.optionAName;
        const optionBName = vote.optionBName;
        res.status(200).json({ totalVotes, optionA: vote.optionA, optionB: vote.optionB, optionAPercentage, optionBPercentage, optionAName, optionBName });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching the results' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
