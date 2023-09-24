const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const gameLogic = require('./game-logic')
const app = express()

/**
 * Backend flow:
 * - check to see if the game ID encoded in the URL belongs to a valid game session in progress. 
 * - if yes, join the client to that game. 
 * - else, create a new game instance. 
 * - '/' path should lead to a new game instance. 
 * - '/game/:gameid' path should first search for a game instance, then join it. Otherwise, throw 404 error.  
 */


const server = http.createServer(app)
const io = socketio(server)

// get the gameID encoded in the URL. 
// check to see if that gameID matches with all the games currently in session. 
// join the existing game session. 
// create a new session.  
// run when client connects
app.get('/', (req, res) => {
    // You can send a simple response like this:
    res.status(200).send('Welcome to the game!')
});

io.on('connection', client => {
    gameLogic.initializeGame(io, client)
})

const port = process.env.PORT || 8000;
// usually this is where we try to connect to our DB. 
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});