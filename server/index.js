import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';
import UserController from './controllers/UserHandlers';
import BookController from './controllers/Bookhandlers';


const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json({
  type: 'application/json',
}));
// would not work atm
// app.post('/api/v1/users/signup', UserController.signup); // signup route
// app.post('/api/v1/users/signin', UserController.signin); // signin route would not work atm

app.post('/api/v2/users/signin', UserController.login);
app.post('/api/v2/users/signup', UserController.signupNew); // signup route with membership, single table

app.post('/api/v3/users/signup', UserController.signupv3); // New login with email or uswername
app.post('/api/v3/users/signin', UserController.loginNew); // New login with email or uswername

app.delete('/api/v2/users', UserController.clearTable);
// app.delete('/api/v1/users', UserController.deleteAll);
app.delete('/api/v1/books', BookController.deleteAllBooks);


app.post('/api/v1/users/:userId/books', UserController.borrowBook);
app.get('/api/v1/Users/:userId/books', UserController.viewBorrowed)
  .put('/api/v1/Users/:userId/books', UserController.returnBook);

/*
app.get('*', (req, res) => res.status(404).send({
  message: 'Sorry Bro That\'s not a request',
}));
*/
app.get('/', (req, res) => res.status(202).send({
  message: 'Welcome to Hello-Books',
}));
app.post('/api/v1/books', BookController.newBook);

app.post('/api/v1/books/mod', BookController.bookQuant);

app.get('/api/v1/books', BookController.allBooks);

app.put('/api/v1/books/:bookId', BookController.modBook);

app.post('/api/v1/authors', BookController.newAuthor);


const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

export default app;