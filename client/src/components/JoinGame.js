import React, { Component } from "react";

class JoinGame extends Component {
    handleInputChange = evt => {
        const { name, value } = evt.target;
        const { form } = this.state;
        const updatedForm = Object.assign({}, form)
        updatedForm[name] = value;
        this.setState({ form: updatedForm });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        const { joinGame, gameInfo } = this.props;
        joinGame(gameInfo.p2Stake).catch(console.log)
    };
    render() {
        const { gameInfo } = this.props;
        //this.props.gameInfo.p2Stake
        return (
            <>
                <div className="field">
                    <label className="label">Your stake (ETH)</label>
                    <div className="control">
                        <input className="input" disabled name="p2Stake" type="number" placeholder="ETH" value={gameInfo.p2Stake} />
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={this.handleSubmit}>Join Game</button>
                    </div>
                </div>
            </>
        );
    }
}

export default JoinGame;