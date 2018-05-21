
let books = [
    {
        "Name": "A Tour of C++",
        "Author": "Bjarne Stroustrup"
    }, {
        "Name": "Effective C++",
        "Author": "Scott Meyers"
    }, {
        "Name": "Exceptional C++",
        "Author": "Herb Sutter"
    }, {
        "Name": " More Effective C++",
        "Author": "Scott Meyers"
    }
];

function getBooksFromDB() {
    // TODO: sync
    return books;
}

function booksApiHandler(req, res) {

    const books = getBooksFromDB();
    res.json(books);
}

function filteringBooksHandler(req, res) {

    let books = getBooksFromDB();

    const {author} = req.query;
    if (author) {

        let filteredBooks = [];
        books.forEach((book) => {
            if (book.Author === author)
                filteredBooks.push(book)
        });

        books = filteredBooks;

    }
    res.json(books);
}

function addBookHandler(req, res) {

    console.log(req.body);

    const {name, author} = req.body;
    if (name && author) {

        // TODO: sync
        const newObject = {
            'Name': name,
            'Author': author
        };
        books.push(newObject);
        res.status(201).json(newObject);

    } else {

        res.status(400).send('Bad Request');

    }
}

function removeBookHandler(req, res) {

    console.log(req.body);

    const {name, author} = req.body;
    if (name && author) {

        // TODO: sync
        books = books.filter( (item) => {
            return item.Name !== name
                && item.Author !== author;
        });
        res.end(200);

    } else {

        res.status(400).send('Bad Request');

    }
}

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/api/v1/books', booksApiHandler);
app.route('/api/v2/books')
    .get(filteringBooksHandler)
    .post(addBookHandler)
    .delete(removeBookHandler);

app.listen(8000);
