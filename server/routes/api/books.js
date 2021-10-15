const express = require('express');
const router = express.Router();

const Book = require('../../models/Book');
const User = require('../../models/User');

const verifyJWT = require('../../middleware/verify');

router.get('/:user', verifyJWT, (req, res) => {
  User.findOne({username: req.params.user})
      .then(user => {
        Book.find({
          '_id': { $in: user.books}
        }, (err, docs) => {
            res.status(200).json(docs);
        });


      })
      .catch(err => res.status(404).json({error: err}));
});

router.get('/:user/:id', verifyJWT, (req, res) => {

  User.findOne({username: req.params.user})
      .then(user => {
        Book.findById(req.params.id)
          .then(book => res.json(book))
          .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
      })
      .catch(err => res.status(404).json({error: err}));

});

router.post('/:user', verifyJWT, (req, res) => {
  Book.create(req.body)
    .then(book => {

      User.findOne({username: req.params.user}, (err, user) => {
        if (user) {
          user.books.push(book);
          user.save();
          res.json({ msg: 'Book added successfully', book })
        }

      })
    })
    .catch(err => res.status(400).json({ error: 'Unable to add this book' }));
});

router.put('/:user/:id', verifyJWT, (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ msg: 'Updated successfully', book }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

router.delete('/:user/:id', verifyJWT, (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then(book => {
      User.findOne({username: req.params.user}, (err, user) => {
        if (user) {
          user.books.pull({_id: req.params.id});
          user.save();
          res.json({ mgs: 'Book entry deleted successfully' });
        }

      })
  }).catch(err => res.status(404).json({ error: 'No such a book' }));
});

module.exports = router;
