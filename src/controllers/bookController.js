const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

function bookController(bookService, nav) {
  function getAllBooks(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected');

        const db = client.db(dbName);

        const col = await db.collection('books');
        const books = await col.find().toArray();

        res.render('books', {
          title: 'Books',
          header: 'Books',
          nav,
          books
        });
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  }
  function getBooksById(req, res) {
    const {
      id
    } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected');

        const db = client.db(dbName);

        const col = await db.collection('books');
        const book = await col.findOne({ _id: new ObjectID(id) });
        book.details = await bookService.getBookById(book.goodreadsId);
        res.render('book', {
          title: 'Book',
          header: 'Book',
          nav,
          book
        });
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  }
  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  return {
    getAllBooks,
    getBooksById,
    middleware
  };
}

module.exports = bookController;
