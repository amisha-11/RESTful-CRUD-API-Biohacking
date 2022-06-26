module.exports = app => {
    const hacks = require("../controllers/hack.controller.js");
    var router = require("express").Router();
    // Create a new Hack
    router.post("/", Hacks.create);
    // Retrieve all Hacks
    router.get("/", Hacks.findAll);
    // Retrieve all published Hacks
    router.get("/published", Hacks.findAllPublished);
    // Retrieve a single Hack with id
    router.get("/:id", Hacks.findOne);
    // Update a Hack with id
    router.put("/:id", Hacks.update);
    // Delete a Hack with id
    router.delete("/:id", Hacks.delete);
    // Create a new Hack
    router.delete("/", Hacks.deleteAll);
    app.use('/api/Hacks', router);
  };