import requests
import json


def simple_http_request():
    response = requests.get('http://localhost:8000/api/v2/books')
    if response.status_code == requests.codes.ok:
        print(response.text)


def get_json_data():
    response = requests.get('http://localhost:8000/api/v2/books')
    if response.status_code == requests.codes.ok:
        books = json.loads(response.text)
        print(books[0]["Author"])
        
 def add_book(name, author):
    r = requests.post("http://bugs.python.org",
                      data={'name': name, 'author': author})
    print(r.status_code, r.reason)


if __name__ == "__main__":
    simple_http_request()
