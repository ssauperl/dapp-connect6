pragma solidity ^0.5.0;
contract Connect6 {

  uint8 constant public board_size = 19;

  Game[] public games;

  struct Game {
      mapping(uint8 => mapping(uint8 => uint8)) board;
      uint8[] move_history;
      address[3] players;
      // 0 means game did not start yet
      uint8 turn;
      // Either 1 or 2. 0 means not finished
      uint8 winner;
      // true if players agreed to a draw
      uint time_per_move;
      // if move is not made by this time, opponent can claim victory
      uint deadline;
      // amount player 1 put in
      uint player_1_stake;
      // amount player 2 must send to join
      uint player_2_stake;
  }

  event LogGameCreated(uint game_num);
  event LogGameStarted(uint game_num);
  event LogVictory(uint game_num, uint8 winner);
  event LogMoveMade(uint game_num, uint8 x1, uint8 y1, uint8 x2, uint8 y2);

  function new_game(uint _time_per_move, uint opponent_stake) public payable {
    games.length++;
    Game storage g = games[games.length - 1];
    g.players[1] = msg.sender;
    g.time_per_move = _time_per_move;
    g.player_1_stake = msg.value;
    g.player_2_stake = opponent_stake;
    // make the first move in the center of the board
    g.board[board_size / 2][board_size / 2] = 1;
    emit LogGameCreated(games.length - 1);
  }
  
  function join_game(uint game_num) public payable {
    Game storage g = games[game_num];
    if (g.turn != 0 || g.player_2_stake != msg.value) {
      revert("Not enough Ether provided.");
    }
    g.players[2] = msg.sender;
    // It's the second player's turn because the first player automatically makes a single move in the center
    g.turn = 2;
    g.deadline = now + g.time_per_move;
    emit LogGameStarted(game_num);
  }
  

function fullBoard(uint game_num) public view returns (uint8[361] memory flattendBoard) {
  //19*19=361+1
  uint8 boardIndex = 0;
  for (uint8 i = 0; i < 19; i++) {
    for (uint8 j = 0; j < 19; j++) {
      flattendBoard[boardIndex] = games[game_num].board[i][j];
      boardIndex++;
    }
  }
} 
function board(uint game_num, uint8 x, uint8 y) public view returns (uint8) {
    return games[game_num].board[x][y];
  }
}