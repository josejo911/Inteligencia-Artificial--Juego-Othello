// INICIALIZACION DE VARIABLES
var tournamentID=142857;
var user_name='Javier_Chinitoveloxxx';

//******NO TOCAR *************
var gameID ;
var playerTurnID ;
var myID;
var rivalID;
var bandera = false ;
var winnerTurnID ;
var movement =7;
var move ;
var board =[];
var board2d =[];
var lastMove;
//*****************************

var chotudo= [];

// var socket = require('socket.io-client')('http://localhost:3000');
var socket = require('socket.io-client')('http://192.168.1.142:4000');
socket.on('connect', function(){
  socket.emit('signin', {
    user_name: user_name,
    tournament_id: tournamentID,
    user_role: 'player'
  });
});

socket.on('ok_signin', function(){
  console.log("Successfully signed in!");
});


socket.on('ready', function(data){
  var gameID = data.game_id;
  var playerTurnID = data.player_turn_id;
  myID=playerTurnID;
  rivalID=rival(myID);
  var board = data.board;

  board2d=transformBoard(board);
  var v= MaxValue(0,board2d,7,-1000,1000);
  move = get1DPos (chotudo[0],chotudo[1]);

  if (move==lastMove){
    move =Math.floor((Math.random() * 63) + 0);
  }
  lastMove=move ;
  console.log(board2d);
  socket.emit('play', {
    tournament_id: tournamentID,
    player_turn_id: playerTurnID,
    game_id: gameID,
    movement: move
  });
});

socket.on('finish', function(data){
  var gameID = data.game_id;
  var playerTurnID = data.player_turn_id;
  var winnerTurnID = data.winner_turn_id;
  var board = data.board;

  socket.emit('player_ready', {
    tournament_id: tournamentID,
    player_turn_id: playerTurnID,
    game_id: gameID
  });
});
