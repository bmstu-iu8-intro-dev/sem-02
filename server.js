const express = require('express');

function rootHandler(req, res)
{
    console.log('root');
    const text = '<H1>This is out library</H1>\r\n' + '<a href="/books">Click here</a>'
    res.end(text);
}

function booksHandler(req, res)
{
    console.log('booksHandler');
    const books =
    [
        {
            "Name": "A Tour of C++",
            "Autor": "Bjarne Stroustrup"
        }, {
            "Name": "Effective C++,",
            "Autor": "Scott Meyers"
        }, {
            "Name": "Exceptional C++",
            "Autor": "Herb Sutter"
        }
    ];

    res.end(JSON.stringify(books, null, 2))
}

const app = express();

app.get('/', rootHandler);
app.get('/books', booksHandler);

app.listen(8000);