const express = require('express');

function rootHandler(req, res) {
    console.log('root');
    const text = '<H1>This is out library</H1>\r\n' + '<a href="/books">Click here</a>'
    res.end(text);
}

function toHTMLString(book) {
    const {author, name} = book;
    return `<H1>${author}</H1>\r\n${name}\r\n`;
}

function booksHandler(req, res) {
    console.log('booksHandler');
    const book = {author: 'Bjarne Stroustrup', name: 'A Tour of C++'};
    const text = toHTMLString(book);
    // const text = '<H1>Bjarne Stroustrup</H1>\r\n' + 'A Tour of C++\r\n'
    //     + '<H1>Scott Meyers</H1>\r\n' + 'Effective C++\r\n';
    res.end(text);
}

function redirectHandler(req, res) {
    console.log('redirectHandler');

    // add redirect header
    res.set('Location', '/books?from=old_books');
    res.send(302);

    // or
    // res.redirect('/books');
}

const app = express();

app.get('/', rootHandler);
app.get('/books', booksHandler);
app.get('/old_books', redirectHandler);

app.listen(8000);