import React, { Component } from "react";
import { GameContext } from '../game-context';
class SelectAccount extends Component {
    static contextType = GameContext;
    handleInputChange = evt => {
        const { value } = evt.target;
        const { changeAccount } = this.props;
        changeAccount(value);
    };
    render() {
        const {accounts, selectedAccount} = this.context;
        return (
            <div>
                <div className="select">
                <label className="label">Account</label>
                    <select name="account" value={selectedAccount} onChange={this.handleInputChange}>
                        {accounts.map((account) =>
                            <option key={account} value={account}>{account}</option>)
                        }
                    </select>
                </div>
            </div>
        );
    }
}

export default SelectAccount;