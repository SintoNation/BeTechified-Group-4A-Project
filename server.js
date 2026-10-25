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



//  PATCH - Update an existing note
app.patch('/notes/:id', (req, res) => {
    const note = notes.find(n => String(n.id) === req.params.id);

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    const updates = { ...req.body };
    delete updates.id; // never allow the id to change

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "Provide at least one field to update" });
    }

    Object.assign(note, updates);
    res.status(200).json(note);
});

// DELETE /notes/:id - Delete a note by its id
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;

  // Find the note's position in the array
  const index = notes.findIndex((note) => String(note.id) === id);

  // No match: nothing to delete
  if (index === -1) {
    return res.status(404).json({ error: 'Note with id ' + id + ' not found' });
  }

  // Remove the note and keep a copy to show in the response
  const [deletedNote] = notes.splice(index, 1);

  res.status(200).json({
    message: 'Note deleted successfully',
    deletedNote,
  });
});