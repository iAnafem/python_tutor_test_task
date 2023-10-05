#!/bin/bash

echo Building and starting containers

cd frontend
npm install

cd ..

docker-compose -f docker-compose.dev.yml up --build -d

docker exec -i python_tutor_test_task_backend_1 bash -c "./manage.py migrate"


