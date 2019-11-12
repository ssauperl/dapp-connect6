import React, { Component } from "react";
import Intersection from './Intersection';

class Gameboard extends Component {

    render() {
        const {gameboard, handlePlaceDot} = this.props;
        return (
            <div className="gameboard">
          {[... gameboard].map((yElement, y) => {
            return [... yElement].map((xElement, x) =>
              <Intersection key={`${x}${y}`}
                dot={xElement}
                handlePlaceDot={(e) => handlePlaceDot(e, x, y)} />
            )
          }
          )}
        </div>
        );
    }
}

export default Gameboard;

