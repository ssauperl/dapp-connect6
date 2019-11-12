import React, { Component } from "react";

class RestoreGame extends Component {

    render() {
        return (
            <div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">Restore the Game Status</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default RestoreGame;