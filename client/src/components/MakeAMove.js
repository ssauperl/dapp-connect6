import React, { Component } from "react";

class MakeAMove extends Component {

    handleSubmit = evt => {
        evt.preventDefault();
        const { makeAMove, move } = this.props;
        makeAMove(move[0], move[1], move[2], move[3]);
    };

    render() {
        const { move } = this.props;

        return (
            <div>
                <div className="field">
                    <label className="label">X1</label>
                    <div className="control">
                        <input className="input" name="x1" disabled={true} type="number" min="0" max="18" placeholder="x1" value={move[0]} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Y1</label>
                    <div className="control">
                        <input className="input" name="y1" disabled={true} type="number" min="0" max="18" placeholder="y1" value={move[1]} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">X2</label>
                    <div className="control">
                        <input className="input" name="x2" disabled={true} type="number" min="0" max="18" placeholder="x2" value={move[2]} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Y1</label>
                    <div className="control">
                        <input className="input" name="y2" disabled={true} type="number" min="0" max="18" placeholder="y2" value={move[3]} />
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={this.handleSubmit}>Make a Move</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MakeAMove;