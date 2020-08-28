package main

import (
	"fmt"
	"log"
	"net/http"
)

var sc *SpellChecker

func correct(w http.ResponseWriter, r *http.Request) {
	// Respond with best guess correction
	fmt.Fprintf(w, sc.correct(r.URL.Query().Get("spelling")))
}

func startServer() {
	// Initialize server
	http.HandleFunc("/correct", correct)
	addr := 8081

	fmt.Printf("\nStarting Spelling Correction server at port :%v...", addr)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", addr), nil))
}

func main() {
	// Initializer spellchecker
	sc = new(SpellChecker)
	sc.Init()

	// Initializer server
	startServer()
}
