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

Redeploy contract
```
deploy --reset
```

Start the frontend:
```
cd client
npm i
npm run start
```

get contract:
```
instance = await Connect6.deployed()
```

start the a new game:
```
result = await instance.new_game(1000, web3.utils.toWei('1', "ether"), {from: accounts[0], value: web3.utils.toWei('1', "ether")})
```

join game:
```
result = await instance.join_game(0, {from: accounts[1], value: web3.utils.toWei('1', "ether")})
```
make a move:
```
result = await instance.make_move(0,0,0,1,1, {from: accounts[0]})
result = await instance.make_move(0,3,3,4,4, {from: accounts[1]})
```

get full board status in flattened array:

```
balance = await instance.fullBoard(0)
```

get single coordinate status:

```
balance = await instance.board(0, 0,0)
```


