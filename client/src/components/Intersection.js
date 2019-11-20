import React, { Component } from "react";
import {GameContext, dotsColor} from '../game-context';

class Dot extends Component {
   render() {
        const {dot} = this.props;
        const classNames =`dot ${dotsColor.WHITE == dot? 'white': ''}${dotsColor.BLACK == dot? 'black': ''}`;
        return (
            <div className={classNames}></div>
        );
    }
}

class Intersection extends Component {

    // static contextType = GameContext;
    // handlePlaceDot = evt => {
    //     const { x,y } = evt.target;
    //     const {board, playerColor} = this.context;
    //     board[x, y] = playerColor;
    // };

    render() {
        const {dot, handlePlaceDot} = this.props;
        return (
            <div className="intersection" onClick={handlePlaceDot} >
                {dot?<Dot dot={dot}/>:null}
              </div>
        );
    }
}

export default Intersection;