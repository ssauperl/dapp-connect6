import React, { Component } from "react";

import ClaimTimeVictory from "./components/ClaimTimeVictory"
import Gameboard from "./components/Gameboard"
import MakeAMove from "./components/MakeAMove"
import GameList from "./components/GameList"
import JoinGame from "./components/JoinGame"
import NewGame from "./components/NewGame"
import RestoreGame from "./components/RestoreGame"
import SelectAccount from "./components/SelectAccount"
import { GameContext, dotsColor } from './game-context';
import Connect6 from "./contracts/Connect6";
import getWeb3 from "./utils/getWeb3";
import 'bulma/css/bulma.css';
import "./App.css";

class App extends Component {
  state = { gameboard: new Array(), game: {}, playerColor: dotsColor.WHITE, web3: null, accounts: [], selectedAccount: '', contract: null, move: [], gameNumber: null };

  //   constructor(props) {
  //     super(props);
  //     const gameboard = new Array(19).map((o) =>{return new Array(19)});
  //     this.setState({ gameboard: gameboard });
  // }
  componentDidMount = () => {
    // for some reason we have to deconstruct else is mapped as only 1 element

  }
  componentDidMount = async () => {


    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Connect6.networks[networkId];
      const instance = new web3.eth.Contract(
        Connect6.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, selectedAccount: accounts[0] }, this.runExample);
      //this.initTheBoard();
      //this.getGameList();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  initTheBoard = () => {
    //const gameboard = [... new Array(19)].map((o) => { return new Array(19) });
    // this.setState({ gameboard });
  }

  startNewGame = async (secPerMove, p1Stake, p2Stake) => {
    const { selectedAccount } = this.state;
    const { contract, web3 } = this.state;
    const BN = web3.utils.BN;
    let result = await contract.methods.newGame(new String(secPerMove), web3.utils.toWei(p2Stake, 'ether')).send({ from: selectedAccount, value: web3.utils.toWei(new BN(p1Stake), 'ether') })
    console.log(result);
  };

  joinGame = async (gameNumber, p2Stake) => {
    const { selectedAccount } = this.state;
    const { contract, web3 } = this.state;
    const BN = web3.utils.BN;
    let result = await contract.methods.joinGame(gameNumber).send({ from: selectedAccount, value: web3.utils.toWei(new BN(p2Stake), 'ether') })
    console.log(result);
  };

  loadGame = async (gameNumber) => {
    const { contract, selectedAccount } = this.state;
    const board = await contract.methods.fullBoard(gameNumber).call()
    this.setState({ gameboard: board });
    const game = await contract.methods.games(gameNumber).call()
    this.setState({ game: game });
  }

  handlePlaceDot = (evt, x, y) => {
    const { gameboard, game, move } = this.state;

    const updatedGameboard = Object.assign([], gameboard);
    let updatedMove = Object.assign([], move);

    const index = x + (19 * y);
    updatedGameboard[index] = 2;//game.turn;
    //move array is not good, beacuse you don't know what to update
    // clear the org moves if you want to correct them
    if (updatedMove.length > 3) {
      const orgMove = { x1: move[0], y1: move[1], x2: move[2], y2: move[3] }
      updatedMove = [];
      if (Number.isInteger(orgMove.x1) && Number.isInteger(orgMove.y1)) {
        updatedGameboard[orgMove.x1 + (19 * orgMove.y1)] = 0;
      }
      if (Number.isInteger(orgMove.x2) && Number.isInteger(orgMove.y2)) {
        updatedGameboard[orgMove.x2 + (19 * orgMove.y2)] = 0;
      }
    }

    updatedMove.push(x, y);


    this.setState({ gameboard: updatedGameboard, move: updatedMove });
  };

  updateMove = (x1, y1, x2, y2) => {
    const { gameboard, game, move } = this.state;

    const updatedGameboard = Object.assign([], gameboard);
    // clear non submited move
    const orgMove = { x1: move[0], y1: move[1], x2: move[2], y2: move[3] }
    if (Number.isInteger(orgMove.x1) && Number.isInteger(orgMove.y1)) {
      updatedGameboard[orgMove.x1 + (19 * orgMove.y1)] = 0;
    }
    if (Number.isInteger(orgMove.x2) && Number.isInteger(orgMove.y2)) {
      updatedGameboard[orgMove.x2 + (19 * orgMove.y2)] = 0;
    }

    const updatedMove=[];
    // update the move on gameboard
    if (Number.isInteger(x1) && Number.isInteger(y1)) {
      updatedGameboard[x1 + (19 * y1)] = 2;//game.turn;
    }
 
    if (Number.isInteger(x2) && Number.isInteger(y2)) {
      updatedGameboard[x2 + (19 * y2)] = 2;//game.turn;
    }
    updatedMove.push(x1,y1,x2,y2);
    this.setState({ move: updatedMove, gameboard: updatedGameboard });
  }

  makeAMove = async (x1, y1, x2, y2) => {
    const { contract, selectedAccount, game, move, gameNumber } = this.state;
    let result = await contract.methods.makeMove(gameNumber, x1, y1, x2, y2).send({ from: selectedAccount });
    // clear you last move
    this.setState({ move: [] });
  }
  // probably we should fetch gameboard here
  // loadGame(gameNumber);

  changeAccount = (account) => {
    this.setState({ selectedAccount: account })
  }

  getGameList = async () => {
    const { contract, web3 } = this.state;
    const result = await contract.methods.getGames(0).call()
    console.log(result);
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    const { gameboard, move } = this.state;
    return (
      <GameContext.Provider value={this.state}>
        <div className="App">
          <SelectAccount changeAccount={this.changeAccount} />
          <NewGame startNewGame={this.startNewGame} />
          {/* <GameList getGameList={this.getGameList}/> */}
          <JoinGame joinGame={this.joinGame} />
          {/* <ClaimTimeVictory /> */}
          <RestoreGame loadGame={this.loadGame} />
          <Gameboard gameboard={gameboard} handlePlaceDot={this.handlePlaceDot} />
          <MakeAMove updateMove={this.updateMove} move={move} makeAMove={this.makeAMove} />
        </div>
      </GameContext.Provider>
    );
  }
}

//App.contextType = GameContext;
export default App;
