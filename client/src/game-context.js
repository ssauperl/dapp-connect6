import React from "react";
export const dotsColor = {
    BLACK: 'black',
    WHITE: 'white'
}

export const GameContext = React.createContext({
    gameboard: new Array(), turn: 0, playerColor: dotsColor.WHITE, web3: null, accounts: [], selectedAccount: null, contract: null
});