FROM python:3.11

WORKDIR /backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

RUN apt-get update \
    && apt-get -y install netcat-traditional gcc postgresql \
    && apt-get clean

RUN pip install --upgrade pip
COPY ./requirements.txt /backend/requirements.txt
RUN pip install -r /backend/requirements.txt
COPY . /backend
EXPOSE 8999
CMD [ "python3", "manage.py", "migrate" ]
CMD [ "python3", "manage.py", "runserver", "0.0.0.0:8999" ]
