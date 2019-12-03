import React, { Component } from "react";

class ClaimTimeVictory extends Component {
    handleSubmit = evt => {
        evt.preventDefault();
        const { claimTimeVictory } = this.props;
        claimTimeVictory();
    };
    render() {
        return (
            <div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={this.handleSubmit}>Claim time victory</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClaimTimeVictory;