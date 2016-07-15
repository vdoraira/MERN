var express = require('express');

var router = express.Router();

router.get("/", function(req, res){
  res.send("<h1>Hello! Admin</h1>");
})

router.get("/super", function(req, res){
  res.send("<h1>Hello! Super Admin</h1>");
})

module.exports = router;
