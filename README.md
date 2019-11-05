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
deploy --reset
```
Start the frontend:
```
cd client
npm i
npm run start
```

instance = await Connect6.deployed()

let result = await instance.new_game(30, web3.utils.toWei('1', "ether"), {from: accounts[0], value: web3.utils.toWei('1', "ether")})


let balance = await instance.fullBoard(0)

 balance = await instance.board(0, 9,9)




