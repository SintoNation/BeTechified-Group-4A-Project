require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

// Temporary storage array for notes (until database is added)
const notes = [
  { id: "1", title: "First Note", content: "This is a sample note." },
  { id: "2", title: "Study Guide", content: "Review Express.js routing today." }
];

let notesID = notes.length;

// 1. GET /notes - Retrieve ALL notes
app.get("/notes", (req, res) => {
  res.status(200).json(notes);
});

// 2. GET /notes/:id - Retrieve a SINGLE note by its ID
app.get("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const foundNote = notes.find((note) => note.id === noteId);

  if (!foundNote) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.status(200).json(foundNote);
});

// 3. POST /notes - Create a new note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required"
    });
  }

  notesID += 1;

  const newNote = {
    id: String(notesID),
    title,
    content
  };

  notes.push(newNote);

  res.status(201).json({
    message: "Note created successfully",
    note: newNote
  });
});

// 4. PATCH /notes/:id - Update an existing note
app.patch("/notes/:id", (req, res) => {
  const note = notes.find((n) => String(n.id) === req.params.id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  const updates = { ...req.body };
  delete updates.id;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      message: "Provide at least one field to update"
    });
  }

  Object.assign(note, updates);

  res.status(200).json(note);
});

// 5. DELETE /notes/:id - Delete a note by its ID
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => String(note.id) === id);

  if (index === -1) {
    return res.status(404).json({
      error: `Note with id ${id} not found`
    });
  }

  const [deletedNote] = notes.splice(index, 1);

  res.status(200).json({
    message: "Note deleted successfully",
    deletedNote
  });
});

module.exports = app;