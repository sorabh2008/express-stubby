# express-stubby


`git clone https://github.com/sorabh2008/express-stubby.git`

`npm i`

`npm run dev`

`npm start`

## ToDo:
- Add logging

## Docker build:

`docker image build -t stubby:v1 .`

`docker image ls`

`docker container run -d --name stubby-1 -p 8081:9000 stubby:v1`

`docker container ls`

`curl localhost:8081`
