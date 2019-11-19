import React, { Component } from "react";

class RestoreGame extends Component {
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
        const { loadGame } = this.props;
        const { gameNumber} = this.state.form;
        loadGame(gameNumber).catch(console.log)
    };

    render() {
        return (
            <div>
                <div className="field">
                    <label className="label">Game Number</label>
                    <div className="control">
                        <input className="input" onChange={this.handleInputChange} name="gameNumber" type="number" placeholder="Game Number" />
                    </div>
                </div>
                <div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link" onClick={this.handleSubmit}>Restore the Game Status</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RestoreGame;