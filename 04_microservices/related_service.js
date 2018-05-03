const express = require('express');

const app = express();

const data = {
    // url encoding, so '+' is omitted
    "a tour of c": ["effective c"],
    "effective c": ["a tour of c", "More Effective C++"],
    "exceptional c": [],
    "more effective c": ["effective c"]
};

app.get('/api/v1/related', (request, response) => {
    const book = request.query["book"];

    if (!book) {
        // bad request
        response.send(400);
        return
    }

    if (book.toLowerCase() in data) {
        response.send(JSON.stringify(data[book]));
        return
    }
    // not found
    response.send(404);
});

app.listen(8002);
