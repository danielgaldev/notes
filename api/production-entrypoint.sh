#!/bin/sh

python src/manage.py migrate
cd src && gunicorn root.wsgi:application --bind 0.0.0.0:8000
