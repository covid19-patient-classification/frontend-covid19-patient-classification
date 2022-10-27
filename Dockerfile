FROM python:3.9-slim

ENV FLASK_APP run.py
ENV PIP_ROOT_USER_ACTION ignore

COPY . ./

RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

EXPOSE 5000
ENV PORT 5000
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app.run:app
