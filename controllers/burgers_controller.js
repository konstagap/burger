var express = require("express");

var router = express.Router();

var burger= require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    // console.log(data)
    var burger = {
      burger: data
    };
    // console.log(burger);
    res.render("index", burger);
  });
});

router.post("/api/burgers", function(req, res) {
  // console.log(req.body.name)
  burger.create(
    "burger_name", 
    req.body.name, function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.delete("/api/burgers/delete/:id", function(req, res) {
  var condition = "id = "+req.params.id;

  burger.delete(condition, function() {
    res.status(200).end();
  })
})
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  // we got req.body.devoured as false cause it was not eaten,
  //as we updating state we have to change value to true 
  //and pass changes to server, if no changes were made its gonna send 404
  req.body.devoured = true;
  // console.log(req.body);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
