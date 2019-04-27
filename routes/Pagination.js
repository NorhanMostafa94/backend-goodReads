const express = require("express");
const paginate = require('express-paginate');
app.all(function(req, res, next) {
    // set default or minimum is 10 (as it was prior to v0.2.0)
    if (req.query.limit <= 10) req.query.limit = 10;
    next();
  });