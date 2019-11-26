import React, { Component } from "react";

class JoinGame extends Component {
    state = { form: { p2Stake: 0 } }

    handleInputChange = evt => {
        const { name, value } = evt.target;
        const { form } = this.state;
        const updatedForm = Object.assign({}, form)
        updatedForm[name] = value;
        this.setState({ form: updatedForm });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        const { joinGame } = this.props;
        const { p2Stake } = this.state.form;
        joinGame(p2Stake).catch(console.log)
    };
    render() {
        const { form } = this.state;
        return (
            <div>
                <div className="field">
                    <label className="label">Your stake (ETH)</label>
                    <div className="control">
                        <input className="input" onChange={this.handleInputChange} name="p2Stake" type="number" placeholder="ETH" value={form.p2Stake} />
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={this.handleSubmit}>Join Game</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default JoinGame;