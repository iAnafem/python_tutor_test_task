### Algorithm for launching this project in development mode (OS Ubuntu 20.04 | 18.04)

#### Clone repository and go to project folder:

> git clone https://github.com/iAnafem/python_tutor_test_task <br />

> cd python_tutor_test_task

#### Install necessary dependencies
If you don't have docker, docker-compose, python3.11:

> sudo ./install_dependencies.sh

#### Launch project

> sudo ./up.sh

This script does the following steps:
- builds and starts containers;
- migrates django models into database;
- fills database tables with test data;


##### Project usage: <br />

Credentials for [Admin Panel](localhost:8999/api/admin/):
- login: admin
- password: admin

Endpoint to get products info in the Django rest framework representation: 
- [click here](localhost:8999/api/admin/):
- or paste this url into your browser
> localhost:8999/api/admin/

Endpoint to get products-info via frontend server: 
- [click here](localhost:3001)
- or paste this url into your browser:
> localhost:8999/api/admin/
