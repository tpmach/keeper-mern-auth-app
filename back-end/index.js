const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

// Set up express
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`)
})

//set up mongoose
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw error
    console.log("Successful connect to mongo db")
  }
)

//set up for run on Heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
  })
}

// set up routes
app.use("/users", require("./routes/userRouter"))
app.use("/notes", require("./routes/noteRouter"))
