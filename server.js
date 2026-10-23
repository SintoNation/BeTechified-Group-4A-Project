require("dotenv").config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// Temporary storage array for notes (until database is added)
const notes = [
    { id: "1", title: "First Note", content: "This is a sample note." },
    { id: "2", title: "Study Guide", content: "Review Express.js routing today." }
];

// 1. GET /notes - Retrieve ALL notes
app.get('/notes', (req, res) => {
    res.status(200).json(notes);
});

// 2. GET /notes/:id - Retrieve a SINGLE note by its ID
app.get('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const foundNote = notes.find(note => note.id === noteId);

    if (!foundNote) {
        return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(foundNote);
});
