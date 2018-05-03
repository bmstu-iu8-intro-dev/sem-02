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

function toHTMLString(book) {
    const {author, name} = book;
    return `<H1>${author}</H1>\r\n${name}\r\n`;
}

function rootHandler(req, res) {

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

app.get('/', rootHandler)

app.listen(8000);