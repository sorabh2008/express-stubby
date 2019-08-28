# express-stubby


`git clone https://github.com/sorabh2008/express-stubby.git`

`npm i`

`npm run dev`

`npm start`

## ToDo:
- Shared Volume for Docker container
    - pass path as variable


## Docker build:

`docker image build -t stubby:v1 .`

`docker container run -d --name stubby-1 -p 8081:9000 stubby:v1`

`curl localhost:8081`

### Useful docker commands

`docker container ls`

`docker image ls`

`docker image history stubby:v1`

`docker image save -o <FILE>.tar`