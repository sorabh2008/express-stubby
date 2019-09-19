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

#### Docker compose docker-compose.yml

```
version: '3'
services:
  ghost:
    container_name: ghost
    image: ghost:latest
    ports:
      - "80:2368"
    environment:
      - database__client=mysql
      - database__connection__host=mysql
      - database__connection__user=root
      - database__connection__password=P4SSw0rd0!
      - database__connection__database=ghost
    volumes:
      - ghost-volume:/var/lib/ghost
    networks:
      - ghost_network
      - mysql_network
    depends_on:
      - mysql

  mysql:
    container_name: mysql
    image: mysql:5.7
    environment:
      - MYSQL_ROOT_PASSWORD=P4SSw0rd0!
    volumes:
      - mysql-volume:/var/lib/mysql
    networks:
      - mysql_network

volumes:
  ghost-volume:
  mysql-volume:

networks:
  ghost_network:
  mysql_network:
```

Create container `docker-compose up -d`
