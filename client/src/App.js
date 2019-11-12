import React, { Component } from "react";

import ClaimTimeVictory from "./components/ClaimTimeVictory"
import Gameboard from "./components/Gameboard"
import GameList from "./components/GameList"
import JoinGame from "./components/JoinGame"
import NewGame from "./components/NewGame"
import RestoreGame from "./components/RestoreGame"
import { GameContext, dotsColor } from './game-context';
import Connect6 from "./contracts/Connect6";
import getWeb3 from "./utils/getWeb3";
import 'bulma/css/bulma.css';
import "./App.css";

class App extends Component {
  state = { gameboard: new Array(), turn:0, playerColor: dotsColor.WHITE, web3: null, accounts: null, contract: null };

//   constructor(props) {
//     super(props);
//     const gameboard = new Array(19).map((o) =>{return new Array(19)});
//     this.setState({ gameboard: gameboard });
// }
  componentDidMount = ()=>{
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
      this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.initTheBoard();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  initTheBoard = () => {
    const gameboard = [... new Array(19)].map((o) =>{return new Array(19)});
    this.setState({ gameboard });
  }

  startNewGame = async (sec_per_move, p1_stk, p2_stk) => {
    const {contract, web3} = this.state;
    let result = await contract.new_game(sec_per_move, p2_stk, {from: web3.eth.accounts[0], value: p1_stk})
    console.log(result);
  };

  handlePlaceDot = (evt, x, y) => {
    const { gameboard, playerColor } = this.state;

    const updatedGameboard = Object.assign([], gameboard);
    updatedGameboard[y][x]=playerColor;
    
    this.setState({gameboard: updatedGameboard});
  };

  render() {
    // if (!this.state.web3) {
    //   //return <div>Loading Web3, accounts, and contract...</div>;
    // }
    const { gameboard } = this.state;
    return (
      <div className="App">
        <NewGame startNewGame={this.startNewGame}/>
        <GameList/>
        <JoinGame/>
        <ClaimTimeVictory/>
        <RestoreGame/>
        <Gameboard gameboard={gameboard} handlePlaceDot={this.handlePlaceDot}/>
      </div>
    );
  }
}

//App.contextType = GameContext;
export default App;
