import React, { Component } from "react";
import Intersection from './Intersection';

class Gameboard extends Component {

    render() {
        const {gameboard, handlePlaceDot} = this.props;
        const layout = [... new Array(19)].map((o) => { return new Array(19) });
        return (
            <div className="gameboard">
          {[... layout].map((yElement, y) => {
            return [... yElement].map((xElement, x) =>{
            const index = x+(19*y);
            const value = gameboard[index];

            console.log(x+(19*y));
            console.log(value);
            return(
              <Intersection key={index}
                dot={value}
                handlePlaceDot={(e) => handlePlaceDot(e, x, y)} />)
              }
            )
          }
          )}
        </div>
        );
    }
}

export default Gameboard;

