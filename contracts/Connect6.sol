pragma solidity ^0.5.0;
contract Connect6 {

  uint8 constant public boardSize = 19;
  uint8 constant public win_size = 6;

  Game[] public games;

  struct Game {
      mapping(uint8 => mapping(uint8 => uint8)) board;
      //address payable[3] players;
      mapping(uint8 => address payable) players;
      address player1;
      address player2;
      // 0 means game did not start yet
      uint8 turn;
      // Either 1 or 2. 0 means not finished
      uint8 winner;
      // true if players agreed to a draw
      uint timePerMove;
      // if move is not made by this time, opponent can claim victory
      uint deadline;
      // amount player 1 put in
      uint player1Stake;
      // amount player 2 must send to join
      uint player2Stake;
  }

  event LogGameCreated(uint gameNum);
  event LogGameStarted(uint gameNum);
  event LogVictory(uint gameNum, uint8 winner);
  event LogMoveMade(uint gameNum, uint8 x1, uint8 y1, uint8 x2, uint8 y2);

  function newGame(uint timePerMove, uint opponentStake) public payable {
    games.length++;
    Game storage g = games[games.length - 1];
    g.players[1] = msg.sender;
    g.player1 = msg.sender;
    g.timePerMove = timePerMove;
    g.player1Stake = msg.value;
    g.player2Stake = opponentStake;
    // make the first move in the center of the board
    g.board[boardSize / 2][boardSize / 2] = 1;
    emit LogGameCreated(games.length - 1);
  }    //check this stuff

  
  function joinGame(uint gameNum) public payable {
    Game storage g = games[gameNum];
    if (g.turn != 0 || g.player2Stake != msg.value) {
      revert("Not enough Ether provided.");
    }
    g.players[2] = msg.sender;
    g.player2 = msg.sender;
    // It's the second player's turn because the first player automatically makes a single move in the center
    g.turn = 2;
    g.deadline = now + g.timePerMove;
    emit LogGameStarted(gameNum);
  }

  function singleMove(uint gameNum, uint8 x, uint8 y) internal {
    if (x > boardSize || y > boardSize) {
      revert("Placing dot outside of the board");
    }
    Game storage g = games[gameNum];
    if (g.board[x][y] != 0) {
      revert("Position already taken");
    }
    g.board[x][y] = g.turn;
  }

  function makeMove(uint gameNum, uint8 x1, uint8 y1, uint8 x2, uint8 y2) public payable {
    Game storage g = games[gameNum];
    if (msg.sender != g.players[g.turn]) {
      revert("game has finished");
    }
    if (msg.sender != g.players[g.turn]) {
      revert("is not your turn");
    }
    singleMove(gameNum, x1, y1);
    singleMove(gameNum, x2, y2);
    g.deadline = now + g.timePerMove;
    emit LogMoveMade(gameNum, x1, y1, x2, y2);
    uint8 victor = checkVictory(gameNum, g.turn);
    if (victor > 0){
      g.winner = g.turn;
      g.turn = 0;
      emit LogVictory(gameNum, g.winner);
    }
    else {
      g.turn = 3 - g.turn;
    }
  }

function fullBoard(uint gameNum) public view returns (uint16[361] memory flattendBoard) {
  //19*19=361
  uint16 boardIndex = 0;
  for (uint8 y = 0; y < boardSize; y++) {
    for (uint8 x = 0; x < boardSize; x++) {
      flattendBoard[boardIndex] = games[gameNum].board[x][y];
      boardIndex++;
    }
  }
}

function board(uint gameNum, uint8 x, uint8 y) public view returns (uint8) {
    return games[gameNum].board[x][y];
  }

function checkVictory(uint gameNum, uint8 playerNum) public view returns (uint8) {
    Game storage g = games[gameNum];
    // Horizontal check
    for (uint8 y = 0; y < boardSize; y++) {
      uint8 count = 0;
      for (uint8 x = 0; x < boardSize; x++) {
        if (g.board[x][y]==playerNum){
          count ++;
        }
        else {
            count = 0;
        }
        if (count >= win_size) {
            return playerNum;
        }
      }
    }

    // Vertical check
    for (uint8 x = 0; x < boardSize; x++) {
      uint8 count = 0;
      for (uint8 y = 0; y < boardSize; y++) {
        if (g.board[x][y]==playerNum){
          count ++;
        }
        else {
            count = 0;
        }
        if (count >= win_size) {
            return playerNum;
        }
      }
    }

    // top-left to bottom-right - green diagonals
    for (uint8 rowStart = 0; rowStart < boardSize; rowStart++) {
      uint8 count = 0;
      uint8 x = 0;
      uint8 y = rowStart;
      while (y < boardSize && x < boardSize) {
        if (g.board[x][y]==playerNum){
          count ++;
        }
        else {
            count = 0;
        }
        if (count >= win_size) {
            return playerNum;
        }
        x++;
        y++;
      }
    }

    // top-left to bottom-right - red diagonals
    for (uint8 colStart = 1; colStart < boardSize; colStart++) {
      uint8 count = 0;
      uint8 x = colStart;
      uint8 y = 0;
      while (y < boardSize && x < boardSize) {
        if (g.board[x][y]==playerNum){
          count ++;
        }
        else {
            count = 0;
        }
        if (count >= win_size) {
            return (playerNum);
        }
        x++;
        y++;
      }
    }
    return 0;
  }

  function claimTimeVictory(uint gameNum) public {
    Game memory g = games[gameNum];
    if (g.winner != 0) {
      revert("game is already over");
    }
    if (g.deadline == 0) {
      revert("game has no timelimit");
    }
    if (now <= g.deadline) {
      revert("opponent time is not up yet");
    }
    g.winner = 3 - g.turn;
    payWinner(gameNum);
    emit LogVictory(gameNum, g.winner);
  }

  function payWinner(uint gameNum) internal {
    Game storage g = games[gameNum];
    uint amount = g.player1Stake + g.player2Stake;
    if (amount > 0 && !g.players[g.winner].send(amount)) {
      revert("reward payment was unsuccessfull");
    }
  }

  function getGameCount() public view returns(uint result){
      result = games.length - 1;
  }
}