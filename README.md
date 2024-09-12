
# Docker Web Application

## Table of Contents  
1. [Introduction](#introduction)  
2. [Database](#database)  
3. [Backend and Frontend](#backend-and-frontend)  
4. [Dockerfile](#dockerfile)  
5. [Docker-Compose](#docker-compose)  
6. [User Interface](#user-interface)  
7. [How to run](#how-to-run)  

---

### 1. Introduction

In this project, a simple client-server application was developed to manage the search for specialized technicians.

The application consists of three main components:

- A non-relational database built with MongoDB.
- A graphical interface obtained via Mongo-Express.
- Node.js, used for interaction with the database and for displaying dynamic content on the HTML page.

Each component was enclosed in a container to allow distribution and execution via Docker.

![strutturaWebApp](https://github.com/user-attachments/assets/b5bdb6b5-5b16-4f4f-ab59-5d671ef66a20)

---

### 2. Database

The MongoDB database was implemented using the public "Mongo" image available on Docker Hub. Additionally, the Mongo-Express image was used to provide a management interface. Both images were included among the services in the "docker-compose" file.

The database stores data related to various specialized technicians, identified by fields such as “Name,” “Surname,” “Profession,” “City,” and “Phone Number.” At the application startup, the database is created and populated if not already present.

![database](https://github.com/user-attachments/assets/9b429d21-3e8c-4d58-81e0-f255fd8dbb35)

---

### 3. Backend and Frontend

#### Backend  
The server side of the application was developed using Node.js, which handles communication with Mongo and client requests.

The server image was created using the 'build' field in the docker-compose file.

#### Frontend  
The user interface was created using JavaScript and HTML. It allows users to select a city and a profession to search the database.

After making the selection, by clicking the "Search Technician" button, a request is sent to the server, which queries MongoDB and displays a table with the results.

![fileWebApp](https://github.com/user-attachments/assets/d085ad9c-7d47-4e0e-9276-5a9e0b78a8f7)

---

### 4. Dockerfile

The Dockerfile contains all the necessary commands to create the image that manages both the client and server sides of the web service.

After importing the Node.js image, an "app" directory is created inside the container, where the necessary files for running the application are copied. Finally, the "npm install" command is executed within the directory using the "RUN" command.

![dockerfile](https://github.com/user-attachments/assets/c053491d-f8b8-45c5-abb5-2d1611975612)

---

### 5. Docker-Compose

The Docker-Compose file, written in YAML format, describes the set of commands and characteristics of each service. Each service is created independently from the image specified in the "image" field, which is inserted into a container. For each image, the ports on which the services will be launched are also specified.

By running the command `docker-compose -f docker-compose.yaml up`, the Docker Daemon is launched, which creates and runs the images inside the containers. The Web Application can then be used.

![dockerCompose](https://github.com/user-attachments/assets/0e5edcf5-4366-4adb-95a1-52e6e0bc5f0e)

---

### 6. User Interface

The user interface allows selecting a city and a profession, showing only those present in the database, to search for technicians related to the two fields.

When the "Search Technician" button is clicked, a request is sent to the server listening on port 3000. The server, through specific functions, makes requests to the MongoDB container listening on port 27017. Finally, a table containing only the technicians matching the user-selected criteria will be displayed.

![ui](https://github.com/user-attachments/assets/c991b08f-215d-4e71-a7a9-003df99d2ad8)

---

### 7. How to run

To start the application:

1. Download the 'Docker-Web-Application' repository.
2. Download 'Docker Desktop'.
3. Open a command prompt.
4. Navigate to the application folder.
5. Run the command: `docker-compose -f docker-compose.yaml up`.
6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
