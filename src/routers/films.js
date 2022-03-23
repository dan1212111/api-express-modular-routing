// Import data here...
const express = require("express")
const router = express.Router()
const data = require("../../data.js")

/* FILMS ENDPOINT */
router.get("/", (req, res) => {
  const films = data.films.filter(
    (film) => film.director === req.query.director
  )
  res.json({ films: films })
})

router.get("/:id", (req, res) => {
  const filmsId = parseInt(req.params.id)
  const userArr = data.films.find((films) => films.id === filmsId)
  res.json({ films: userArr })
})

router.post("/", (req, res) => {
  const newFilm = {
    id: data.films.length + 1,
    director: req.body.director,
  }
  data.films.push(newFilm)
  res.json({ user: newFilm })
})

router.delete("/:id", (req, res) => {
  const filmId = parseInt(req.params.id)

  const filmToDelete = data.films.find((film) => film.id === filmId)
  if (!filmToDelete) {
    res.status(404)
    res.json({ error: "film does not exist" })
    return
  }

  data.films = data.films.filter((film) => film !== filmToDelete)
  res.json({ film: filmToDelete })
})

router.put("/:id", (req, res) => {
  const filmId = parseInt(req.params.id)

  const existingfilm = data.films.find((film) => film.id === filmId)
  if (!existingfilm) {
    res.status(404)
    res.json({ error: "film does not exist" })
    return
  }

  if (!req.body.title) {
    res.status(400)
    res.json({ error: "title not specified" })
    return
  }

  existingfilm.title = req.body.title

  res.json({ film: existingfilm })
})

router.patch("/:id", (req, res) => {
  const filmId = parseInt(req.params.id)

  const existingfilm = data.films.find((film) => film.id === filmId)
  if (!existingfilm) {
    res.status(404)
    res.json({ error: "film does not exist" })
    return
  }

  if (!req.body.title) {
    res.status(400)
    res.json({ error: "title not specified" })
    return
  }

  existingfilm.title = req.body.title

  res.json({ film: existingfilm })
})


module.exports = router
