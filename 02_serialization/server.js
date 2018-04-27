const express = require('express');

function toHTMLString(book) {
    const {author, name} = book;
    return `<H1>${author}</H1>\r\n${name}\r\n`;
}

function bookHandler(req, res) {
    const book = {author: 'Bjarne Stroustrup', name: 'A Tour of C++'};
    const text = toHTMLString(book);
    res.end(text);
}

function bookApiHandler(req, res) {
    const book = {author: 'Bjarne Stroustrup', name: 'A Tour of C++'};
    // serializing the object
    const text = JSON.stringify(book);
    res.end(text);
}

function booksApiHandler(req, res) {
    // array
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

    // serializing the array
    const text = JSON.stringify(books, null, 2);
    res.end(text);
}

const app = express();

app.get('/old_book', bookHandler);
app.get('/book', bookApiHandler);
app.get('/books', booksApiHandler);

app.listen(8000);