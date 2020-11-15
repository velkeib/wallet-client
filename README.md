Wallet front-end created by Bence Velkei

includes docker image file

To create docker image execute:
docker build -t velkeib/wallet-client

To run the docker container execute:
docker run -d -it -p 80:80/tcp --name wallet-client velkeib/wallet-client