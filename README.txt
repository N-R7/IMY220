Capture Photo Sharing App

GitHub Repository:
https://github.com/N-R7/IMY220

BACKEND

Build:
docker build -t capture-backend ./backend

Run:
docker run -d -p 3000:3000 --name backend-container capture-backend


FRONTEND

Build:
docker build -t capture-frontend ./frontend

Run:
docker run -d -p 5173:5173 --name frontend-container capture-frontend


ACCESS URLS

Frontend:
http://localhost:5173

Backend:
http://localhost:3000


STOP CONTAINERS

docker stop backend-container frontend-container


REMOVE CONTAINERS

docker rm backend-container frontend-container