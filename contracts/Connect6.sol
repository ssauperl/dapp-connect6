pragma solidity ^0.5.0;
contract Connect6 {

  uint8 constant public board_size = 19;
  uint8 constant public win_size = 6;

  Game[] public games;

  struct Game {
      mapping(uint8 => mapping(uint8 => uint8)) board;
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

  function single_move(uint game_num, uint8 x, uint8 y) internal {
    if (x > board_size || y > board_size) {
      revert("Placing dot outside of the board");
    }
    Game storage g = games[game_num];
    if (g.board[x][y] != 0) {
      revert("Position already taken");
    }
    g.board[x][y] = g.turn;
  }

  function make_move(uint game_num, uint8 x1, uint8 y1, uint8 x2, uint8 y2) public payable {
    Game storage g = games[game_num];
    if (msg.sender != g.players[g.turn]) {
      revert("game has finished");
    }
    if (msg.sender != g.players[g.turn]) {
      revert("is not your turn");
    }
    single_move(game_num, x1, y1);
    single_move(game_num, x2, y2);
    g.deadline = now + g.time_per_move;
    emit LogMoveMade(game_num, x1, y1, x2, y2);
    uint8 victor = check_victory(game_num, g.turn);
    if (victor > 0){
      g.winner = g.turn;
      g.turn = 0;
      emit LogVictory(game_num, g.winner);
    }
    else {
      g.turn = 3 - g.turn;
    }
  }

function fullBoard(uint game_num) public view returns (uint16[361] memory flattendBoard) {
  //19*19=361
  uint16 boardIndex = 0;
  for (uint8 y = 0; y < board_size; y++) {
    for (uint8 x = 0; x < board_size; x++) {
      flattendBoard[boardIndex] = games[game_num].board[x][y];
      boardIndex++;
    }
  }
} 
function board(uint game_num, uint8 x, uint8 y) public view returns (uint8) {
    return games[game_num].board[x][y];
  }

function check_victory(uint game_num, uint8 player_num) public view returns (uint8) {
    Game storage g = games[game_num];
    // Horizontal check
    for (uint8 y = 0; y < board_size; y++) {
      uint8 count = 0;
      for (uint8 x = 0; x < board_size; x++) {
        if (g.board[x][y]==player_num){
          count ++;
        }
        else {
            count = 0;
        }
        if (count >= win_size) {
            return player_num;
        }
      }
    }

    // Vertical check
    for (uint8 x = 0; x < board_size; x++) {
      uint8 count = 0;
      for (uint8 y = 0; y < board_size; y++) {
        if (g.board[x][y]==player_num){
          count ++;
        }
        else {
            count = 0;
        }
        if (count >= win_size) {
            return player_num;
        }
      }
    }

    // top-left to bottom-right - green diagonals
    for (uint8 rowStart = 0; rowStart < board_size; rowStart++) {
      uint8 count = 0;
      uint8 x = 0;
      uint8 y = rowStart;
      while (y < board_size && x < board_size) {
        if (g.board[x][y]==player_num){
          count ++;
        }
        else {
            count = 0;
        }
        if (count >= win_size) {
            return player_num;
        }
        x++;
        y++;
      }
    }

    // top-left to bottom-right - red diagonals
    for (uint8 colStart = 1; colStart < board_size; colStart++) {
      uint8 count = 0;
      uint8 x = colStart;
      uint8 y = 0;
      while (y < board_size && x < board_size) {
        if (g.board[x][y]==player_num){
          count ++;
        }
        else {
            count = 0;
        }
        if (count >= win_size) {
            return (player_num);
        }
        x++;
        y++;
      }
    }
    return 0;
  }

  function pay_winner(uint game_num) internal {
    Game memory g = games[game_num];
    uint amount = g.player_1_stake + g.player_2_stake;
    if (amount > 0 && !g.players[g.winner].transfer(amount)) {
      revert();
    }
  }
}