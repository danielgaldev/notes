# SemestR

Semester tracker for students.

## Features
* Create account
* Login
* Add semester
* See your list of semesters
* Logout

## Startup
#### Build
```
docker volume create --name semestr-db
```
```
docker-compose build
```

#### Start
```
docker-compose up
```
You can access the app at http://localhost:3000.

The REST API is listening on http://localhost:8000.
