import express from 'express'
import cors from 'cors'
import session from 'express-session'

const app = express()

app.use( cors() ) // CORS check
app.use( express.json() ) // parse JSON body

// SESSION / COOKIE config
app.use( session({
  secret: "h@lyS$cr$!",
  saveUninitialized: false,
  resave: false,
  proxy: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000*60*60*5, // 1000*60 => 1 min 
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none": "lax"
  }
}))

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Auth API. Hack me if you can..."
  })
})

// FAKE user database
const users = [
  { _id: "u1", email: "u1@u1.com", pw: "u1" },
  { _id: "u2", email: "u2@u2.com", pw: "u2" },
  { _id: "u3", email: "u3@u3.com", pw: "u3" },
]
const books = [
  { _id: "b1", title: "Der Prozess", author: "Franz Kafka" },
  { _id: "b2", title: "Alice in Wonderland", author: "Lewis Carrol" },
  { _id: "b3", title: "Das Glasperlenspiel", author: "Hermann Hesse" },
]

app.post("/login", (req, res) => {
  const { email, password } = req.body

  if(!email || !password) {
    return res.status(400).json({ error: "Provide email and password fields"})
  }

  const user = users.find(user => user.email == email && user.pw == password)

  if(!user) {
    return res.status(400).json({ error: "No user found with given credentials. Try again!" })
  }

  // extract public user info
  const {pw, ...userPublic} = user

  // create SESSION
  req.session.user = userPublic

  res.json(userPublic)
})

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      return res.status(500).json({
        error: "Logout failed. Try again later..."
      })
    }
    res.json({
      message: "Logged you out successfully!"
    })

  })
})

// security guard
const auth = (req, res, next) => {

  if(!req.session.user) {
    return res.status(401).json({
      error: "Dios mio! Not authenticated! No rights whats-o-ever here...",
    })
  }

  next()

}

// protected page
app.get("/books", auth, (req, res) => {

  console.log("SESSION:", req.session.user)

  res.json(books)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`API started: http://localhost:${PORT}`))