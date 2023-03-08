import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import routes from './userRoutes.js'
import cors from 'cors'

import path from 'path'

const port = 4000


const app = express()
app.use(cors());


dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () =>console.log("Database connected") )

app.use(express.json())
app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/app', routes)

app.use((req, res, next) => {
  const error = new Error(`Not found -${req.originalUrl}`)
  res.status(404)
  next(error)
})
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
})


app.listen(process.env.PORT || port, () => console.log("server is up and running"))

//Server Production Assests
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join("build")))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"))
  } )
}