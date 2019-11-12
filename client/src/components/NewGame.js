import React, { Component } from "react";

class NewGame extends Component {

    render() {
        return (
            <div>
                <div className="field">
                    <label className="label">Time Per Move (s)</label>
                    <div className="control">
                        <input className="input" type="number" placeholder="s" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Opponent stake (ETH)</label>
                    <div className="control">
                        <input className="input" type="number" placeholder="ETH" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Your stake (ETH)</label>
                    <div className="control">
                        <input className="input" type="number" placeholder="ETH" />
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">Host the Game</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewGame;