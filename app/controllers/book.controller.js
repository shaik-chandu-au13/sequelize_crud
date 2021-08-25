const db = require("../models");
const book = db.books;
const Op = db.Sequelize.Op;

// Create and Save a new book
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a book
  const book = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save book in the database
  book.create(book)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the book."
      });
    });
};

// Retrieve all books from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  book.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books."
      });
    });
};

// Find a single book with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  book.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving book with id=" + id
      });
    });
};

// Update a book by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  book.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "book was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update book with id=${id}. Maybe book was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating book with id=" + id
      });
    });
};

// Delete a book with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  book.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "book was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete book with id=${id}. Maybe book was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete book with id=" + id
      });
    });
};

// Delete all books from the database.
exports.deleteAll = (req, res) => {
  book.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} books were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all books."
      });
    });
};

// find all published book
exports.findAllPublished = (req, res) => {
  book.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books."
      });
    });
};