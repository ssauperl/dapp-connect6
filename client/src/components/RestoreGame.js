import React, { Component } from "react";

class RestoreGame extends Component {

    handleSubmit = evt => {
        evt.preventDefault();
        const { loadGame } = this.props;
        loadGame().catch(console.log)
    };

    render() {
        return (
            <div>
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