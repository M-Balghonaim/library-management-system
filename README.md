# Project Summary

The project consists of an application that is a library management system, which uses a separate service that performs spelling corrections. The library management system provides an easy interface to manage library books and users. Regular users may borrow books. Librarians may approve a borrow request and administrators may perform tasks that require elevated prevelages, such as managing user accounts.


The project uses HTML, CSS, JavaScript (Node.js), Python and Golang:
    
1. **Frontend**: The frontend is written in HTML, CSS and JavaScript. It uses external libraries such as Bootstrap and JQuery.
2. **Backend (library-management-system)**: As the main backend it is implemented using Node.js. It uses a Postgres database and communicates with a separate service using a RESTful API.
3. **Backend (spellingcorrection)**: This is a stand-alone service implemented using Go and used by the main backend for the app. It receives a specific spelling of a word and returns a suggested spelling that may be a correction. 
4. **Helper Script (build_language_model.py)**: This is a helper script executed by the Go server. It outputs results to a file, which the Go server reads.


### **Run code**

1. Start: 
    1. `docker-compose build && docker-compose up` (optional: you can append `-d` after `docker-compose up` to run it in detached mode)
    2. Visit http://localhost:3000

2. Stop:  
    1. `docker-compose down`


# Notes
1. You can call a test endpoint to load test data into the database, which you can use to demo the project. It creates a regular user, librarian, and admin account for you to test (it also adds books):
    1. user:
        1. Email (for signing in): `user@user.ca`
        2. Password: `user2121!`
    2. Librarian:
        1. Email (for signing in): `lib@lib.ca`
        2. Password: `lib2121!`
    3. Admin:
        1. Email (for signing in): `admin@admin.ca`
        2. Password: `admin2121!`
    
2. The spelling correction is only effective for single-word search queries

