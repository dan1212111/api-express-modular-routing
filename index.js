const express = require("express")
const app = express()
const port = 3030

const cors = require("cors")
const morgan = require("morgan")

// SETUP MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// REQUIRE ROUTERS
const usersRoutes = require("./src/routers/users")
const booksRoutes = require("./src/routers/books")
const filmsRoutes = require("./src/routers/films")

// ADD ROUTERS TO APP
app.use("/users", usersRoutes)
app.use("/books", booksRoutes)
app.use("/films", filmsRoutes)

/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`)
})
