Wallet front-end created by Bence Velkei

includes docker image file

To create docker image execute:
docker build -t velkeib/wallet-client .

To run the docker container execute:
docker run -d -it --network wallet-network -p 4200:80/tcp --name wallet-client velkeib/wallet-client

