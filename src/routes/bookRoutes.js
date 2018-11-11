const express = require('express');

const bookRouter = express.Router();

function router(nav) {
  const books = [{
    title: 'Fundamentals of Physics',
    author: 'HC Verma',
    genre: 'Engineering',
    read: false
  },
  {
    title: 'C Sharp',
    author: 'O\'Reilly',
    genre: 'Engineering',
    read: false
  },
  {
    title: 'Fundamentals of Physics',
    author: 'HC Verma',
    genre: 'Engineering',
    read: false
  },
  {
    title: 'Fundamentals of Physics',
    author: 'HC Verma',
    genre: 'Engineering',
    read: false
  },
  {
    title: 'Fundamentals of Physics',
    author: 'HC Verma',
    genre: 'Engineering',
    read: false
  }
  ];

  bookRouter.route('/')
    .get((req, res) => {
      res.render('books', {
        title: 'Books',
        header: 'Books',
        nav,
        books
      });
    });
  bookRouter.route('/:id')
    .get((req, res) => {
      const {
        id
      } = req.params;
      res.render('book', {
        title: 'Book',
        header: 'Book',
        nav,
        book: books[id]
      });
    });
  return bookRouter;
}
module.exports = router;
