# COMP713-Assignment-1
## Welcome!
- ConsoleDex is a small distributed Web Application for COMP713 Assignment 1
- Focuses on implementing a retro console storage system for individual sellers or collectors

## Installation and Setup
### Tools required
- Docker
- Node.js & npm (normally come together)

- installing both has different steps depending on OS, refer to the DOCs to install the tools

### Database Install
- the database for this project is run on a docker container
- install the MYSQL linuxserver.io docker container using the following docker commands
`sudo docker create --name=mysql -p 3306:3306 -e PUID=1000 -e PGID=1000 -e MYSQL_ROOT_PASSWORD=12345678 -v /home/charles/project/db:/config linuxserver/mysql`

- PUID and PGID of the container can be set to 1000
- the database password is 12345678 (very secure i know)
- and set the path of </path/to/appdata> to anywhere on your computer you want the config of the docker container

### Project and Dependencies install
- next clone the repo using `git clone <this repo URL>`
- either using the terminal or a code editor with a terminal emulator use command `npm install` to install the dependencies within the project
- this requires Node.js to be installed

### Start the Project
- first start the database by using docker command `docker start mysql` "mysql" is the name that was defined above, change it if you have changed the container name
- then start the project by being in the root directory and using command `node app.js`
- the program will ask if you want to run the database init, do so if this is the first time running this project
- head over to your browser of choice and enter url `http://localhost:8080/`, the port `8080` is specified at launch 


