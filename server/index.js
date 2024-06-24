const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/authRoutes.js")

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send('Hello there')
});

app.use('/auth', authRoutes)

app.listen(PORT, () => console.log(`Server is live and running on ${PORT}`))
