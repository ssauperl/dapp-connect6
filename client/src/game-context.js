import React from "react";
export const dotsColor = {
    BLACK: 'black',
    WHITE: 'white'
}

export const GameContext = React.createContext({
    board: Array(Array()),
    playerColor: dotsColor.BLACK
});