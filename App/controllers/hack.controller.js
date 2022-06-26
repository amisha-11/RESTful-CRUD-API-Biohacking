const db = require("../models");
const Hack = db.hacks;



// Create and Save a new Hack
exports.create = (req, res) => {

  // validate request
  if(!req.body.title){
    res.status(400).send({message: "Content can't be empty!"});
    return;
  }

  // create Hack
  const hack = new Hack({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // save Hack in the database
  hack
    .save(hack)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Hack."
        });
    });
};


// Regular expression or Regex is usually used to find a pattern in a string. option i : ignore case
// Retrieve all Hacks from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Hack.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving hacks."
      });
    });
};



// Find a single Hack with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Hack.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Hack with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Hack with id=" + id });
      });
};



// Update a Hack by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      Hack.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update HAck with id=${id}. Maybe Tutorial was not found!`
            });
          } else res.send({ message: "Hack was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Hack with id=" + id
          });
        });
};



// Delete a Hack with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  Hack.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Hack with id=${id}`
        });
      } else {
        res.send({
          message: "Hack was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Hack with id=" + id
      });
    });
};



// Delete all Hacks from the database.
exports.deleteAll = (req, res) => {
    Hack.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Hacks were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Hacks."
      });
    });
};



// Find all published Hacks
exports.findAllPublished = (req, res) => {
    Hack.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Hacks."
      });
    });
};