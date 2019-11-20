import React from "react";
export const dotsColor = {
    BLACK: 2,
    WHITE: 1
}

export const GameContext = React.createContext({
    gameboard: new Array(), turn: 0, playerColor: dotsColor.WHITE, web3: null, accounts: [], selectedAccount: null, contract: null
});