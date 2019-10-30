import React, { Component } from "react";

import Intersection from "./components/Intersection"
import { GameContext, dotsColor } from './game-context';
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = { gameboard: new Array(), playerColor: dotsColor.BLACK, web3: null, accounts: null, contract: null };

//   constructor(props) {
//     super(props);
//     const gameboard = new Array(19).map((o) =>{return new Array(19)});
//     this.setState({ gameboard: gameboard });
// }
  componentDidMount = ()=>{

    //not good todo
    const gameboard = new Array(19).map((o) =>{return new Array(19)});
    this.setState({ gameboard });
  }
  //componentDidMount = async () => {


    // try {
    //   // Get network provider and web3 instance.
    //   const web3 = await getWeb3();

    //   // Use web3 to get the user's accounts.
    //   const accounts = await web3.eth.getAccounts();

    //   // Get the contract instance.
    //   const networkId = await web3.eth.net.getId();
    //   const deployedNetwork = SimpleStorageContract.networks[networkId];
    //   const instance = new web3.eth.Contract(
    //     SimpleStorageContract.abi,
    //     deployedNetwork && deployedNetwork.address,
    //   );

    //   // Set web3, accounts, and contract to the state, and then proceed with an
    //   // example of interacting with the contract's methods.
    //   this.setState({ web3, accounts, contract: instance }, this.runExample);
    // } catch (error) {
    //   // Catch any errors for any of the above operations.
    //   alert(
    //     `Failed to load web3, accounts, or contract. Check console for details.`,
    //   );
    //   console.error(error);
    // }

    //const gameboard = new Array(new Array());
  //}

  handlePlaceDot = (evt, x, y) => {
    //const { x,y } = evt.target;
    const { playerColor } = this.state;
    //board[x, y] = playerColor;
    this.setState(prevState => ({
      board: {
        ...prevState.board,
        [prevState.board[x][y]]: playerColor,
      },
    }));
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    // if (!this.state.web3) {
    //   //return <div>Loading Web3, accounts, and contract...</div>;
    // }
    const { gameboard } = this.state;
    const wef =gameboard.map((yElement, y)=>{return yElement});
    return (
      <div className="App">
        <div className="gameboard">
          {gameboard.map((yElement, y) => {
            return yElement.map((xElement, x) =>
              <Intersection key={`${x}${y}`}
                dot={xElement}
                handlePlaceDot={(e) => this.handlePlaceDot(e, x, y)} />
            )
          }
          )}
        </div>
      </div>
    );
  }
}

//App.contextType = GameContext;
export default App;
