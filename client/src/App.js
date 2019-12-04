import React, { Component } from "react";

import ClaimTimeVictory from "./components/ClaimTimeVictory"
import Gameboard from "./components/Gameboard"
import MakeAMove from "./components/MakeAMove"
import GameInfo from "./components/GameInfo"
import GameNumber from "./components/GameNumber"
import GameList from "./components/GameList"
import JoinGame from "./components/JoinGame"
import NewGame from "./components/NewGame"
import RestoreGame from "./components/RestoreGame"
import SelectAccount from "./components/SelectAccount"
import HashAvatar from "./components/HashAvatar"
import { GameContext, dotsColor } from './game-context';
import Connect6 from "./contracts/Connect6";
import getWeb3 from "./utils/getWeb3";
import 'bulma/css/bulma.css';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { runInThisContext } from "vm";

class App extends Component {
  state = { gameboard: new Array(), game: {}, playerColor: dotsColor.WHITE, web3: null, accounts: [], selectedAccount: '', contract: null, move: [], gameInfo: { p2Stake: 0 }, gameList: [] };

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
      //this.getGameList();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  startNewGame = async (secPerMove, p1Stake, p2Stake) => {
    const { selectedAccount } = this.state;
    const { contract, web3 } = this.state;
    const BN = web3.utils.BN;
    const { toHex } = web3.utils;
    let result = await contract.methods.newGame(toHex(secPerMove), web3.utils.toWei(p2Stake, 'ether')).send({ from: selectedAccount, value: web3.utils.toWei(p1Stake, 'ether') })
    console.log(result);
  };

  joinGame = async (p2Stake) => {
    const { selectedAccount, gameInfo } = this.state;
    const { contract, web3 } = this.state;
    const BN = web3.utils.BN;
    let result = await contract.methods.joinGame(gameInfo.gameNumber).send({ from: selectedAccount, value: web3.utils.toWei(new BN(p2Stake), 'ether') })
    console.log(result);
    this.updateGameInfo();
  };

  updateGameInfo = async () => {
    const { gameInfo } = this.state;
    const updatedGameInfo = await this.createGameInfo(gameInfo.gameNumber);
    this.setState({ gameInfo: updatedGameInfo });
  }

  createGameInfo = async (gameNumber) => {
    const { contract, selectedAccount } = this.state;
    const game = await contract.methods.games(gameNumber).call()
    game.currentPlayer = 0;
    if (game.player1 === selectedAccount) {
      game.currentPlayer = 1;
    }
    else if (game.player2 === selectedAccount) {
      game.currentPlayer = 2;
    }
    game.gameNumber = gameNumber;
    return game;
  }

  loadGame = async () => {
    const { contract, gameInfo } = this.state;
    const board = await contract.methods.fullBoard(gameInfo.gameNumber).call()
    const updatedGameInfo = await this.createGameInfo(gameInfo.gameNumber);
    this.setState({ gameboard: board, gameInfo: updatedGameInfo, move:[] });
  }

  handlePlaceDot = (evt, x, y) => {
    const { gameboard, game, move } = this.state;

    const updatedGameboard = Object.assign([], gameboard);
    let updatedMove = Object.assign([], move);

    const index = x + (19 * y);
    updatedGameboard[index] = game.turn;
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

  makeAMove = async (x1, y1, x2, y2) => {
    const { contract, selectedAccount, gameInfo } = this.state;
    let result = await contract.methods.makeMove(gameInfo.gameNumber, x1, y1, x2, y2).send({ from: selectedAccount });
    console.log(result);
    await this.loadGame();
  }

  changeAccount = (account) => {
    this.setState({ selectedAccount: account })
  }

  getGameList = async () => {
    const { contract } = this.state;
    let gameCount = await contract.methods.getGameCount().call()
    console.log(gameCount);

    let startIndex = 0;
    if (gameCount > 10) {
      startIndex = gameCount - 11; //index=count-1 -> 10+1 
    }

    const gameList = []
    for (var i = startIndex; i <= gameCount; i++) {
      const game = await contract.methods.games(i).call()
      game.gameNumber = i; // game object doesn't store index, so we have to remember it
      gameList.push(game);
    }
    this.setState({ gameList: gameList });
  }

  setGameNumber = async (gameNumber) => {
    const updatedGameInfo = await this.createGameInfo(gameNumber);
    this.setState({ gameInfo: updatedGameInfo })
  }

  claimTimeVictory = async () => {
    const { contract, selectedAccount, gameInfo } = this.state;
    let result = await contract.methods.claimTimeVictory(gameInfo.gameNumber).send({ from: selectedAccount });
    console.log(result);
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    const { gameboard, move, gameInfo, selectedAccount, gameList } = this.state;
    return (
      <Router>
        <GameContext.Provider value={this.state}>
          <div className="App">
            <div className="columns">
              <div className="column">
                <div className="box">
                  <article className="media">
                    <div className="media-left">
                      <HashAvatar hash={selectedAccount} />
                    </div>
                    <div className="media-content">
                      <div className="content">
                        <SelectAccount changeAccount={this.changeAccount} />
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
            <div className="tabs is-centered">
              <ul>
                <li><NavLink exact to="/" activeClassName="is-active">Create game</NavLink></li>
                <li><NavLink to="/join" activeClassName="is-active">Join game</NavLink></li>
                <li><NavLink to="/game" activeClassName="is-active">Game</NavLink></li>
              </ul>
            </div>
            <Switch>
              <Route path="/join">
                <div className="container">
                  <GameNumber gameInfo={gameInfo} updateGameNumber={this.setGameNumber} />
                  <JoinGame gameInfo={gameInfo} joinGame={this.joinGame} />
                  <GameList getGameList={this.getGameList} gameList={gameList} selectGame={this.setGameNumber} gameInfo={gameInfo}/>
                </div>
              </Route>
              <Route path="/game">
                <div className="container">
                  <div className="columns">
                    <div className="column is-three-quarters"><Gameboard gameboard={gameboard} handlePlaceDot={this.handlePlaceDot} /></div>
                    <div className="column is-one-quarter">
                      <GameNumber gameInfo={gameInfo} updateGameNumber={this.setGameNumber} />
                      <GameInfo gameInfo={gameInfo} />
                      <RestoreGame loadGame={this.loadGame} />
                      <MakeAMove move={move} makeAMove={this.makeAMove} />
                      <ClaimTimeVictory claimTimeVictory={this.claimTimeVictory} />
                    </div>
                  </div>
                </div>
              </Route>
              <Route path="/">
                <div className="container">
                  <NewGame startNewGame={this.startNewGame} />
                </div>
              </Route>
            </Switch>
          </div>
        </GameContext.Provider>
      </Router>
    );
  }
}

//App.contextType = GameContext;
export default App;
