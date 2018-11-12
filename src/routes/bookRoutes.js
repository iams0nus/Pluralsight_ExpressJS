const express = require('express');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();
const bookService = require('../services/goodreadService');

function router(nav) {
  const { getAllBooks, getBooksById, middleware } = bookController(bookService, nav);
  bookRouter.use(middleware); // intercept all requests irrespective of the method type(get/post)
  // and next() to move forward

  bookRouter.route('/').get(getAllBooks);

  bookRouter.route('/:id').get(getBooksById); // :id means id is a parameter and can be retrieved
  // from req.params.id

  return bookRouter;
}
module.exports = router;
