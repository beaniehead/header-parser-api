const express = require('express');
const router = express.Router();
const fs = require('fs');
const controller = require("../controllers/controller");

router.get('/_api/package.json', (req, res, next) => {
  console.log('requested');
  fs.readFile('./package.json', (err, data) => {
    if (err) return next(err);
    res.type('txt').send(data.toString());
  });
});

router.get('/test', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

router.get('/', controller.whoAmI);

module.exports = router;