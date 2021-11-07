#!/bin/bash

echo Hello! Nice to meet you!

while getopts ":n:d:P:u:p:s:k:" opt; do
  case "${opt}" in
    n ) project_name="${OPTARG}";;
    d ) db_name="${OPTARG}";;
    P ) db_port="${OPTARG}";;
    u ) db_user="${OPTARG}";;
    p ) db_password="${OPTARG}";;
    s ) db_server="${OPTARG}";;
    k ) secret_key="${OPTARG}";;
    \? )
      echo "Invalid option: $OPTARG" 1>&2
      ;;
    : )
      echo "Invalid option: $OPTARG requires an argument" 1>&2
      ;;
      
  esac
done
shift $((OPTIND -1))
echo "Project name is ${project_name}"
echo "Database name is ${db_name}"
echo "Database server is ${db_server}"
echo "Database port is ${db_port}"
echo "Database user is ${db_user}"
echo "Database password is ${db_password}"
echo "Secret key is ${secret_key}"
sed -i "s&POSTGRES_USER.*&POSTGRES_USER=$db_user&g" backend/config/.env.template
sed -i "s&POSTGRES_PORT.*&POSTGRES_PORT=5432&g" backend/config/.env.template
sed -i "s&POSTGRES_SERVER.*&POSTGRES_SERVER=$db_server&g" backend/config/.env.template
sed -i "s&POSTGRES_PASSWORD.*&POSTGRES_PASSWORD=$db_password&g" backend/config/.env.template
sed -i "s&POSTGRES_DB.*&POSTGRES_DB=$db_name&g" backend/config/.env.template
sed -i "s&DJANGO_SECRET_KEY.*&DJANGO_SECRET_KEY=$secret_key&g" backend/config/.env.template

mv backend/config/.env.template backend/config/.env

sed -i "s&db_port:5432&$db_port:5432&g" docker-compose.dev.yml
sed -i "s&db_server&$db_server&g" docker-compose.dev.yml
sed -i "s&- db_server&- $db_server&g" docker-compose.dev.yml


mv ../django-react-project-template ../$project_name

grep -rli 'django-react-project-template' * | xargs -i@ sed -i "s/django-react-project-template/$project_name/g" @

grep -rli 'react_default_app' * | xargs -i@ sed -i "s/react_default_app/$project_name/g" @


cd frontend
npm install

cd ../ && sudo apt install python3.11-venv && python3.11 -m venv backend/venv
source backend/venv/bin/activate
pip install --upgrade pip
pip install -r backend/requirements.txt

echo Run containers

docker-compose -f docker-compose.dev.yml up --build -d

docker exec -i "${project_name}_backend_1" bash -c "./manage.py migrate"

cd ../${project_name}

echo Done!