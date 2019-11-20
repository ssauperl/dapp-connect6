import React, { Component } from "react";

class MakeAMove extends Component {
    handleInputChange = evt => {
        const { name, value } = evt.target;
        const { move, updateMove } = this.props;
        const updatedForm = { x1: move[0], y1: move[1], x2: move[2], y2: move[3] }
        updatedForm[name] = Number(value);
        updateMove(updatedForm.x1, updatedForm.y1, updatedForm.x2, updatedForm.y2);
    };

    handleSubmit = evt => {
        evt.preventDefault();
        const { makeAMove, move } = this.props;
        makeAMove(move[0], move[1], move[2], move[3]);
    };

    render() {
        const { move } = this.props;

        return (
            <div>
                {/* <div className="field">
                    <label className="label">Game Number</label>
                    <div className="control">
                        <input className="input" onChange={this.handleInputChange} name="gameNumber" type="number" placeholder="Game Number" />
                    </div>
                </div> */}
                <div className="field">
                    <label className="label">X1</label>
                    <div className="control">
                        <input className="input" name="x1" onChange={this.handleInputChange} type="number" min="0" max="18" placeholder="x1" value={move[0]} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Y1</label>
                    <div className="control">
                        <input className="input" name="y1" onChange={this.handleInputChange} type="number" min="0" max="18" placeholder="y1" value={move[1]} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">X2</label>
                    <div className="control">
                        <input className="input" name="x2" onChange={this.handleInputChange} type="number" min="0" max="18" placeholder="x2" value={move[2]} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Y1</label>
                    <div className="control">
                        <input className="input" name="y2" onChange={this.handleInputChange} type="number" min="0" max="18" placeholder="y2" value={move[3]} />
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