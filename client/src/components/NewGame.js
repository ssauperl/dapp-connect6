import React, { Component } from "react";

class NewGame extends Component {
    state = { form: {} }

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
        const { timePerMove, p1Stake, p2Stake, account} = this.state.form;
        startNewGame(account || this.props.accounts[0], timePerMove, p1Stake, p2Stake).catch(console.log)
    };

    render() {
        const accounts = this.props.accounts || [];
        const selectedAccount = this.state.form.account || accounts[0];
        return (
            <div>
                <div className="select">
                <label className="label">Account</label>
                    <select name="account" value={selectedAccount} onChange={this.handleInputChange}>
                        {accounts.map((account) =>
                            <option value={account}>{account}</option>)
                        }
                    </select>
                </div>
                <div className="field">
                    <label className="label">Time Per Move (s)</label>
                    <div className="control">
                        <input className="input" name="timePerMove" onChange={this.handleInputChange} type="number" placeholder="s" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Your stake (ETH)</label>
                    <div className="control">
                        <input className="input" name="p1Stake" onChange={this.handleInputChange} type="number" placeholder="ETH" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Opponent's stake (ETH)</label>
                    <div className="control">
                        <input className="input" name="p2Stake" onChange={this.handleInputChange} type="number" placeholder="ETH" />
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