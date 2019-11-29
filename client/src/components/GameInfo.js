import React, { Component } from "react";
import moment from 'moment';

class Timer extends Component {
    state = { timeLeft: 0 }

    componentDidMount = () => {
        var intervalId = setInterval(this.tick, 1000)
        this.setState({ intervalId: intervalId });
    }

    componentWillUnmount = () => function () {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }
    tick = () => {
        const deadline = this.props.deadline;

        const timeLeft = deadline - Math.floor(Date.now() / 1000);
        this.setState({ timeLeft: timeLeft });
    }

    render() {

        const { timeLeft } = this.state;
        const deadline = this.props.deadline;
        return (
            <div className="Timer">
                <div className="tags has-addons">
                    <span className="tag">Time left</span>
                    <span className="tag is-primary">{timeLeft}s</span>
                </div>
                <div className="tags has-addons">
                    <span className="tag">Deadline</span>
                    <span className="tag is-primary">{moment.unix(deadline).format("ddd, hA")}</span>
                </div>

            </div>
        );
    }
}

class GameNumber extends Component {
    state = { form: {} }

    handleInputChange = evt => {
        const { name, value } = evt.target;
        const { updateGameNumber } = this.props;
        updateGameNumber(value);
    };

    render() {
        const { gameInfo } = this.props;
        return (
            <div>
                <Timer deadline={gameInfo.deadline} />
                <div className="field">
                    <label className="label">Game Number</label>
                    <div className="control">
                        <input className="input" onChange={this.handleInputChange} name="gameNumber" type="number" placeholder="Game Number" value={this.props.gameInfo.gameNumber} />
                    </div>
                </div>


            </div>
        );
    }
}

export default GameNumber;