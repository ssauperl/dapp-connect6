import React, { Component } from "react";

class JoinGame extends Component {

    render() {
        return (
            <div>
                <div className="field">
                    <label className="label">Game Number</label>
                    <div className="control">
                        <input className="input" type="number" placeholder="Game Number" />
                    </div>
                </div>


                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">Join Game</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default JoinGame;