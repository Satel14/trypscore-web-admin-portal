# README #

To Deploy with docker:
(1) docker compose up -d #this compiles the docker containers in daemon mode(background)
---At this point you can execute commands---
(2)
    (a) create a .env file in the project root (b) firebase login:ci (c)make 2 variables in  the .env file, FIREBASE_TOKEN
    and FIREBASE_PROJECT_ID, setting FIREBASE_TOKEN to the token you get in step b, and the FIREBASE_PROJECT_ID to your project id, eg. trypscore-dev
(3) docker-compose exec  client-portal npm run build_dev #for production use npm run build  ***please use this to build if the container is new
(4) docker-compose exec client-portal npm run start #this will run the app


---If you wish to save a container state, eg. after adding login and project, try this:
(5) docker ps -l #grab the container id, eg. 

CONTAINER ID   IMAGE                     COMMAND                  CREATED          STATUS          PORTS                                            NAMES
64c83af98599   trypscore-bi-web_client   "docker-entrypoint.s…"   30 minutes ago   Up 30 minutes   0.0.0.0:5000->5000/tcp, 0.0.0.0:9005->9005/tcp   trypscore-bi-web_client_1

(6) docker commit -m "Add firebase login" 64c83af98599 trypscore-bi-web_client #you now can have an image with authentication already setup

(7) delete dangling volumes:
    docker volume rm `docker volume ls -q -f dangling=true`
(8) delete dangling images:
    docker rmi -f $(docker images -f "dangling=true" -q)