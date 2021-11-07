### Algorithm for launching this project in development mode (OS Ubuntu 20.04 | 18.04)

#### Clone repository and go to project folder:

git clone https://github.com/iAnafem/django-react-project-template <br />
cd django-react-project-template

#### Install necessary dependencies
If you don't have docker, docker-compose, python3.11:

sudo ./install_dependencies.sh

#### Launch setup_project.sh

##### Usage example: <br />

sudo ./setup_project.sh -n <project_name> -d <db_name> -P <db_public_port> -u <db_user> -p <db_password> -s <db_server> -k <secret_key>

##### Access to postgres cli: <br />
"docker-compose exec <db_container_name> psql -h <db_host> -U <db_user> --dbname=<db_name>"

##### Frontend server: 
localhost:3001

##### Backend server: 
localhost:8999

Everything is ready for development!