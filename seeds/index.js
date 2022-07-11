const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

const Campground = require('../models/campground')

mongoose
  .connect('mongodb://localhost:27017/timber-camp')
  .then((result) => {
    console.log('mongo connection open!')
  })
  .catch((error) => {
    console.log('Oh no mongo connection error!!!')
    console.log(error)
  })

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
  await Campground.deleteMany({})

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
    })
    await camp.save()
  }
}

seedDB()

seedDB().then(() => {
  mongoose.connection.close()
})
