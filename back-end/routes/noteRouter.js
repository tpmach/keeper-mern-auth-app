const router = require("express").Router()
const auth = require("../middleware/auth")
const Note = require("../models/noteModel")

router.post("/new", auth, async (req, res) => {
  try {
    const { title, content } = req.body

    //validate
    if (!title || !content)
      return res.status(400).json({ msg: "Not all fields have been entered." })

    const newNote = new Note({
      title,
      content,
      userId: req.user,
    })

    const savedNote = await newNote.save()
    res.json(savedNote)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get("/all", auth, async (req, res) => {
  const noteList = await Note.find({ userId: req.user })
  res.json(noteList)
})

router.delete("/:id", auth, async (req, res) => {
  const note = await Note.findOne({ userId: req.user, _id: req.params.id })
  if (!note)
    return res.status(400).json({
      msg: "No notes found with this ID that belong to the current user.",
    })
  const deletedNote = await Note.findByIdAndDelete({ _id: req.params.id })
  res.json(deletedNote)
})

router.get("/:id", auth, async (req, res) => {
  const note = await Note.findOne({ userId: req.user, _id: req.params.id })
  if (!note)
    return res.status(400).json({
      msg: "No notes found with this ID that belong to the current user.",
    })

  res.json(note)
})

router.patch("/:id/edit", auth, async (req, res) => {
  const note = await Note.findOne({ userId: req.user, _id: req.params.id })
  if (!note)
    return res.status(400).json({
      msg: "No notes found with this ID that belong to the current user.",
    })

  await Note.findByIdAndUpdate({ _id: req.params.id }, req.body)

  const updatedNote = await Note.findById({ _id: req.params.id })

  res.json(updatedNote)
})

module.exports = router
