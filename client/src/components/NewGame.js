import React, { Component } from "react";

class NewGame extends Component {
    state = { form: { timePerMove: "900", p1Stake: "0", p2Stake: "0" } }

    handleInputChange = evt => {
        const { name, value } = evt.target;
        const { form } = this.state;
        const updatedForm = Object.assign({}, form)
        updatedForm[name] = value;
        this.setState({ form: updatedForm });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        const { startNewGame } = this.props;
        const { timePerMove, p1Stake, p2Stake } = this.state.form;
        startNewGame(timePerMove, p1Stake, p2Stake).catch(console.log)
    };

    render() {
        const { form } = this.state;
        return (
            <div>
                <div className="field">
                    <label className="label">Time Per Move (s)</label>
                    <div className="control">
                        <input className="input" name="timePerMove" onChange={this.handleInputChange} type="number" placeholder="s" value={form.timePerMove} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Your stake (ETH)</label>
                    <div className="control">
                        <input className="input" name="p1Stake" onChange={this.handleInputChange} type="number" placeholder="ETH" value={form.p1Stake} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Opponent's stake (ETH)</label>
                    <div className="control">
                        <input className="input" name="p2Stake" onChange={this.handleInputChange} type="number" placeholder="ETH" value={form.p2Stake} />
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={this.handleSubmit}>Host the Game</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewGame;