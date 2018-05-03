const express = require('express');

const app = express();

const data = {
    // url encoding, so '+' is omitted
    "a tour of c": "https://www.amazon.com/Tour-C-Depth/dp/0321958314",
    "effective c": "https://www.amazon.com/Effective-Specific-Improve-Programs-Designs/dp/0321334876",
    "exceptional c": "https://www.amazon.com/Exceptional-Engineering-Programming-Problems-Solutions/dp/0201615622/"
};

app.get('/api/v1/shop', (request, response) => {
    const book = request.query["book"];

    if (!book) {
        // bad request
        response.send(400);
        return
    }

    if (book.toLowerCase() in data) {
        response.send({
            "shop": data[book]
        });
        return
    }
    // not found
    response.send(404);
});

app.listen(8001);
