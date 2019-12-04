import React, { Component } from "react";


class Row extends Component {
    handleSubmit = evt => {
        evt.preventDefault();
        const { game, selectGame } = this.props;
        selectGame(game.gameNumber).catch(console.log)
    };
    render() {
        const { gameNumber, timePerMove, player1, player1Stake, player2, player2Stake } = this.props.game;
        const classNames =`${this.props.selectGameNumber === gameNumber? 'is-selected': ''}`;
        return (
            <tr className={classNames}>
                <th>{gameNumber}</th>
                <th>{timePerMove}</th>
                <th>{player1}</th>
                <th>{player1Stake}</th>
                <th>{player2}</th>
                <th>{player2Stake}</th>
                <th><button className="button" onClick={this.handleSubmit} >Select</button></th>
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
        const { gameList, selectGame, gameInfo } = this.props;
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {gameList.map((game) =>
                            <Row key={game.gameNumber} selectGame={selectGame} game={game} selectGameNumber={gameInfo.gameNumber} />
                        )}
                    </tbody>
                </table>
            </>
        );
    }
}

export default GameList;