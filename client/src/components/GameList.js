import React, { Component } from "react";


class Row extends Component {
    render() {
         const {game, timePerMove, p1, p1Stake, p2, p2Stake} = this.props;
         return (
            <tr>
            <th>{game}</th>
            <th>{timePerMove}</th>
            <th>{p1}</th>
            <th>{p1Stake}</th>
            <th>{p2}</th>
            <th>{p2Stake}</th>
        </tr>
         );
     }
 }
class GameList extends Component {

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th><abbr title="Game">Game</abbr></th>
                            <th><abbr title="Time per move">Time per move</abbr></th>
                            <th><abbr title="p1">p1</abbr></th>
                            <th><abbr title="p1 stake">p1 stake</abbr></th>
                            <th><abbr title="p2">p2</abbr></th>
                            <th><abbr title="p2 stake">p2 stake</abbr></th>
                        </tr>
                    </thead>
                    <tbody>
                        <Row/>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GameList;