FROM python:3.9

ENV FLASK_APP run.py

COPY . ./

#COPY app app
RUN pip install -r requirements.txt
RUN pip install Flask gunicorn

EXPOSE 5000
ENV PORT 5000

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 run:app