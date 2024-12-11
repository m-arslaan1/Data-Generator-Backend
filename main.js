const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const Employee = require("./models/Employee")

conn = mongoose.connect('mongodb://127.0.0.1:27017/company');

const getRandom = (arr)=>{
  let rno = Math.floor(Math.random() * (arr.length - 1))
  return arr[rno]
}

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { foo: 'FOO' });
})

app.get('/generate', async(req, res) => {
  //clear the collection first
  await Employee.deleteMany({}) 

  //Generate random data
  let randomNames = ['Mohan', 'Sohan', 'Arslaan', 'Rohan'];
  let randomLang = ['Java', 'C++', 'Python', 'JavaScript'];
  let randomCities = ["Bhopal", "Delhi", "Lucknow", "Mumbai"]
  
  for(let i=0; i < 10; i++) {
    let e = await Employee.create({
      name: getRandom(randomNames),
      salary: Math.floor(Math.random() * 50000),
      language: getRandom(randomLang),
      city: getRandom(randomCities),
      isManager: (Math.random() > 0.5) ? true : false
    })
    console.log(e)
  }
  res.render('index', {foo: 'FOO'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 