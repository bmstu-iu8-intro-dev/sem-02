package main

import (
	"net/http"
	"log"
	"io"
	"golang.org/x/net/http2"
)

func rootHandler(response http.ResponseWriter, request *http.Request) {

	log.Print(request.URL)
	io.WriteString(response, "Hello, secure world!")
}

func main() {

	http.HandleFunc("/", rootHandler)

	srv := &http.Server{
		Addr: ":8000", // Normally ":443"
		Handler: nil, // http.DefaultServeMux
	}

	http2.ConfigureServer(srv, &http2.Server{})
	srv.ListenAndServeTLS("cert.pem", "key.pem")
}
