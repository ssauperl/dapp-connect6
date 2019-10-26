## Decentralized connect6 game on ethereum with web3 and react truffle box
Start local ethereum blockchain:
```
node_modules/.bin/ganache-cli
```
Compile and deploy smart contracts:
```
node_modules/.bin/truffle console --network develop
compile
migrate
```
Start the frontend:
```
cd client
npm i
npm run start
```