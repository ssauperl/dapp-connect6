import React, { Component } from "react";

class GameNumber extends Component {
    state = { form: {} }

    handleInputChange = evt => {
        const { name, value } = evt.target;
        const { updateGameNumber } = this.props;
        updateGameNumber(value);
    };

    render() {
        return (
            <div>
                <div className="field">
                    <label className="label">Game Number</label>
                    <div className="control">
                        <input className="input" onChange={this.handleInputChange} name="gameNumber" type="number" placeholder="Game Number" value={this.props.gameInfo.gameNumber} />
                    </div>
                </div>


            </div>
        );
    }
}

export default GameNumber;