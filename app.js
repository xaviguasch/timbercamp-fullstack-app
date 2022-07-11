const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const Campground = require('./models/campground')

mongoose
  .connect('mongodb://localhost:27017/timber-camp')
  .then((result) => {
    console.log('mongo connection open!')
  })
  .catch((error) => {
    console.log('Oh no mongo connection error!!!')
    console.log(error)
  })

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/makecampground', async (req, res) => {
  const camp = new Campground({ title: 'My Backyard' })
  await camp.save()

  res.send(camp)
})

app.listen(3000, () => {
  console.log('Serving on port 3000')
})
