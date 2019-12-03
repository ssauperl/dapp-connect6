import React, { Component } from "react";


class Row extends Component {
    render() {
        const { gameNumber, timePerMove, player1, player1Stake, player2, player2Stake } = this.props.game;
        return (
            <tr>
                <th>{gameNumber}</th>
                <th>{timePerMove}</th>
                <th>{player1}</th>
                <th>{player1Stake}</th>
                <th>{player2}</th>
                <th>{player2Stake}</th>
            </tr>
        );
    }
}
class GameList extends Component {
    state = { page: 0 }
    handleSubmit = evt => {
        evt.preventDefault();
        const { getGameList } = this.props;
        getGameList().catch(console.log)
    };

    render() {
        const { gameList } = this.props;
        return (
            <>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={this.handleSubmit}>Load list</button>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th><abbr title="Game">Game</abbr></th>
                            <th><abbr title="Time per move">Time per move</abbr></th>
                            <th><abbr title="p1">Player 1</abbr></th>
                            <th><abbr title="p1 stake">p1 stake</abbr></th>
                            <th><abbr title="p2">Player 2</abbr></th>
                            <th><abbr title="p2 stake">p2 stake</abbr></th>
                        </tr>
                    </thead>
                    <tbody>
                        {gameList.map((game) =>
                            <Row key={game.gameNumber} game={game} />
                        )}
                    </tbody>
                </table>
            </>
        );
    }
}

export default GameList;