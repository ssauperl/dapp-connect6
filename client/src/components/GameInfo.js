import React, { Component } from "react";
import moment from 'moment';

class GameInfo extends Component {
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
        const {gameInfo} = this.props;
        const timeLeft = gameInfo.deadline - Math.floor(Date.now() / 1000);
        this.setState({ timeLeft: timeLeft });
    }

    render() {

        const { timeLeft } = this.state;
        const {gameInfo} = this.props;
        return (
            <div className="Timer">
                <div className="tags has-addons">
                    <span className="tag">Turn</span>
                    <span className="tag is-primary">{gameInfo.turn}</span>
                </div>
                <div className="tags has-addons">
                    <span className="tag">Player 1</span>
                    <span className="tag is-primary">{gameInfo.player1}</span>
                </div>
                <div className="tags has-addons">
                    <span className="tag">P1 Stake</span>
                    <span className="tag is-primary">{gameInfo.player1Stake}</span>
                </div>
                <div className="tags has-addons">
                    <span className="tag">Player 2</span>
                    <span className="tag is-primary">{gameInfo.player2}</span>
                </div>
                <div className="tags has-addons">
                    <span className="tag">P2 Stake</span>
                    <span className="tag is-primary">{gameInfo.player2Stake}</span>
                </div>
                <div className="tags has-addons">
                    <span className="tag">Time left</span>
                    <span className="tag is-primary">{timeLeft}</span>
                </div>
                <div className="tags has-addons">
                    <span className="tag">Player 1</span>
                    <span className="tag is-primary">{moment.unix(gameInfo.deadline).format("ddd, hA")}</span>
                </div>

            </div>
        );
    }
}

export default GameInfo;