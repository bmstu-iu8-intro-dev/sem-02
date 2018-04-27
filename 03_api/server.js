const express = require('express');

function getBooksFromDB() {
    const books = [
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

    return books;
}

function booksApiHandler(req, res) {

    const books = getBooksFromDB();
    const text = JSON.stringify(books, null, 2);
    res.end(text);
}

function booksNewApiHandler(req, res) {

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
    res.end(JSON.stringify(books, null, 2));
}

const app = express();

app.get('/api/v1/books', booksApiHandler);
app.get('/api/v2/books', booksNewApiHandler);

app.listen(8000);