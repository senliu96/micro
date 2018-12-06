var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/person', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'person.html'));
});

router.get('/address', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'address.html'));
});

module.exports = router;
