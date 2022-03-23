// Import data here...
const express = require("express")
const router = express.Router()
const data = require("../../data.js")

// Write routes here...

/* BOOKS ENDPOINT */
router.get("/", (req, res) => {
  res.json({ books: data.books })
})

router.get("/:id", (req, res) => {
  const bookId = parseInt(req.params.id)
  const bookArr = data.books.find((books) => books.id === bookId)
  res.json({ books: bookArr })
})

router.post("/", (req, res) => {
  const newBook = {
    id: data.books.length + 1,
    title: req.body.title,
  }
  data.books.push(newBook)
  res.json({ book: newBook })
})

router.delete("/:id", (req, res) => {
  const bookId = parseInt(req.params.id)

  const bookToDelete = data.books.find((book) => book.id === bookId)
  if (!bookToDelete) {
    res.status(404)
    res.json({ error: "book does not exist" })
    return
  }

  data.books = data.books.filter((book) => book !== bookToDelete)
  res.json({ book: bookToDelete })
})

/*PUT*/
router.put("/:id", (req, res) => {
  const bookId = parseInt(req.params.id)

  const existingbook = data.books.find((book) => book.id === bookId)
  if (!existingbook) {
    res.status(404)
    res.json({ error: "book does not exist" })
    return
  }

  if (!req.body.title) {
    res.status(400)
    res.json({ error: "title not specified" })
    return
  }

  existingbook.title = req.body.title

  res.json({ book: existingbook })
})

module.exports = router
