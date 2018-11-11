const express = require('express');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();
const bookService = require('../services/goodreadService');

function router(nav) {
  const { getAllBooks, getBooksById, middleware } = bookController(bookService, nav);
  bookRouter.use(middleware);

  bookRouter.route('/').get(getAllBooks);

  bookRouter.route('/:id').get(getBooksById);

  return bookRouter;
}
module.exports = router;
