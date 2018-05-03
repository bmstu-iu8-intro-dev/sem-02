package main

import (
	"net/http"
	"log"
	"encoding/json"
	"io"
)

type RelatedBook struct {
	Related []string
}

var data = make(map[string][]string)

func initServer(){
	data["name"] = []string{"1", "2"}
}

func rootHandler(response http.ResponseWriter, request *http.Request) {
	log.Print(request.URL)

	q := request.URL.Query()
	bookName := q.Get("book")
	if bookName == "" {

		log.Print("Bad request")
		response.WriteHeader(http.StatusBadRequest)
		io.WriteString(response, "Bad request")
		return

	}

	if related, ok := data[bookName]; ok {

		if obj, err := json.Marshal(related); err == nil {

			io.WriteString(response, string(obj))

		} else {

			log.Printf("Can't marshaling %v", related)
			response.WriteHeader(http.StatusInternalServerError)
			io.WriteString(response, "Internal server error")

		}

	} else {

		log.Printf("Can't find a key %v", bookName)
		response.WriteHeader(http.StatusNotFound)
		io.WriteString(response, "not found " + bookName)

	}
}

func main() {
	initServer()
	http.HandleFunc("/", rootHandler)
	http.ListenAndServe(":8000", nil)
}
