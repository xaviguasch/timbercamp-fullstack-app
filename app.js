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

app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({})

  res.render('campgrounds/index', { campgrounds })
})

app.get('/campgrounds/:id', async (req, res) => {
  const { id } = req.params

  const campground = await Campground.findById(id)

  res.render('campgrounds/show', { campground })
})

app.listen(3000, () => {
  console.log('Serving on port 3000')
})
