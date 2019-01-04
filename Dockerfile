FROM python:3.6.7-slim

# Set environment variables

ENV USER_NAME amaris

COPY . app/

WORKDIR app/

RUN pip install --trusted-host pypi.python.org -r requirements.txt

EXPOSE 5000

CMD ["python", "server.py"]
