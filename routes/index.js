const express = require('express');
const router = express.Router();
const fs = require('fs');
router.get('/_api/package.json', (req, res, next) => {
  console.log('requested');
  fs.readFile('./package.json', (err, data) => {
    if (err) return next(err);
    res.type('txt').send(data.toString());
  });
});
router.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});
router.get('/:time', (req, res) => {
  var response;
  const enteredTime = req.params.time;

  function processTime(date) {
    //define whether input is natural language or numbers (see if it has anything other than numbers or is just a number)
    if (isNaN(date.getTime())) { // d.valueOf() could also work
      // date is not valid
      response = {
        unix: null,
        natural: null
      }
    } else { // date is valid
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      const unix = date.getTime() / 1000;
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      const day = `0${date.getDate()}`.slice(-2);
      const natural = `${month} ${day}, ${year}`;
      console.log(JSON.stringify(year).slice(2, 3));
      //checking if a year is a leap year - divisible by 4
      if (month == "February" && day == 29 && year % 4 == 0) {
        //leap years occur every 4 years, except for years divisible by 100 and not divisible by 400
        if (year % 100 == 0 && year % 400 != 0) {
          response = {
            unix: null,
            natural: null
          }
        } else {
          response = {
            unix,
            natural
          }
        }
        response = {
          unix,
          natural
        }
      } else {
        response = {
          unix: null,
          natural: null
        }
      }
    }
  }
  //need to convert number strings to numbers to make them work otherwise they return a weird date
  if (!isNaN(+enteredTime)) {
    processTime(new Date(+enteredTime * 1000));
  } else {
    processTime(new Date(enteredTime));
  }
  res.send(response);
});
module.exports = router;