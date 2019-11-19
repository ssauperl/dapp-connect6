import React, { Component } from "react";

import ClaimTimeVictory from "./components/ClaimTimeVictory"
import Gameboard from "./components/Gameboard"
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
  state = { gameboard: new Array(), turn: 0, playerColor: dotsColor.WHITE, web3: null, accounts: [], selectedAccount: '', contract: null };

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
      this.initTheBoard();
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
    const gameboard = [... new Array(19)].map((o) => { return new Array(19) });
    this.setState({ gameboard });
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
    const { contract } = this.state;
    const result = await contract.methods.fullBoard(gameNumber).call()
    console.log(result);
    const result2 = await contract.methods.games(gameNumber).call()
    console.log(result2);
  }

  handlePlaceDot = (evt, x, y) => {
    const { gameboard, playerColor } = this.state;

    const updatedGameboard = Object.assign([], gameboard);
    updatedGameboard[y][x] = playerColor;

    this.setState({ gameboard: updatedGameboard });
  };

  changeAccount = (account) => {
    this.setState({ selectedAccount: account })
  }

  getGameList = async () => {
    const { contract, web3 } = this.state;
    const result = await contract.methods.getGames(0).call()
    console.log(result);
  }

  render() {
    // if (!this.state.web3) {
    //   //return <div>Loading Web3, accounts, and contract...</div>;
    // }
    const { gameboard, accounts, selectedAccount } = this.state;
    return (
      <GameContext.Provider value={this.state}>
        <div className="App">
          <SelectAccount changeAccount={this.changeAccount} />
          <NewGame startNewGame={this.startNewGame} />
          {/* <GameList getGameList={this.getGameList}/> */}
          <JoinGame joinGame={this.joinGame}/>
          {/* <ClaimTimeVictory /> */}
          <RestoreGame loadGame={this.loadGame} />
          <Gameboard gameboard={gameboard} handlePlaceDot={this.handlePlaceDot} />
        </div>
      </GameContext.Provider>
    );
  }
}

//App.contextType = GameContext;
export default App;
