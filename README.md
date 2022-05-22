# session-auth-fullstack

This mini project shows how to integrate an AUTHENTICATION FLOW between a frontend and a backend.

The sample uses this setup:
- React for the frontend (in the folder client/)
- Express for the backend
- Express-Session as library for creating server-side sessions and session cookies for the frontend
- A JSON database with users, books and individual user booklists
- An request file (.http) to store common test requests against our backend (to check the authenticatin flow)
- React Context to store & share the user state in the frontend with all pages


To simplify the setup, NO database is used. The auth workflow is independent from a DB. 
But of course you can also outsource the given JSON data in the backend to a database, as a challenge ;)

The following concepts are shown:
- How to login a user on a /login route checking email & password
- How to create a SESSION and attach a session COOKIE on successfull login
- How to call the login route from the frontend using fetch
- How to store the received cookie using the fetch option "credentials": "include"
- How to check login status on page refreshes by calling a /me route of the backend, checking if still got a valid cookie
- How to grab user specific data from a /books route

This mini project could serve you as a template or reference on how to create your own frontend backend integration flow.

