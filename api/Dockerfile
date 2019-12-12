FROM python:3.7-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /app

RUN apk add gcc python3-dev musl-dev postgresql-dev libpq

COPY requirements.txt /app/
RUN pip install -r requirements.txt && pip install gunicorn

COPY . /app/
EXPOSE 8000
ENTRYPOINT ["./production-entrypoint.sh"]
