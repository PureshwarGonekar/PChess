import React, {useRef} from 'react'
import { Link, useHistory } from 'react-router-dom';
import Game from '../model/chess'
import Square from '../model/square'
import { Stage, Layer } from 'react-konva';
import ChessBoard1 from '../assets/chessBoard.png'
import ChessBoard2 from '../assets/chessBoard1.png'
import ChessBoard3 from '../assets/chessBoard2.png'
import useSound from 'use-sound'
import chessMove from '../assets/moveSoundEffect.mp3'
import Piece from './piece'
import piecemap from './piecemap'
import { useParams } from 'react-router-dom'
import { ColorContext } from '../../context/colorcontext' 
import VideoChatApp from '../../connection/videochat'
import ShareButtons from '../../pages/SocialButtons';
import logogif from "../../img/pchess.gif";
import queengirl from "../../img/queengirl.jpg";

const scaleFactor = 0.9;

const chessboardThemes ={
    default : ChessBoard1,
    theme1: ChessBoard2,
    theme2: ChessBoard3,
}

const socket  = require('../../connection/socket').socket
var Board1

class ChessGame extends React.Component {

    state = {
        gameState: new Game(this.props.color),
        draggedPieceTargetId: "", // empty string means no piece is being dragged
        playerTurnToMoveIsWhite: true,
        whiteKingInCheck: false, 
        blackKingInCheck: false, 
        gameOver: false,
        winner: null,
        requestingRematch: false,
    }


    componentDidMount() {
        socket.on('opponent move', move => {
            // move == [pieceId, finalPosition]
            // console.log("opponenet's move: " + move.selectedId + ", " + move.finalPosition)
            if (move.playerColorThatJustMovedIsWhite !== this.props.color) {
                this.movePiece(move.selectedId, move.finalPosition, this.state.gameState, false)
                this.setState({
                    playerTurnToMoveIsWhite: !move.playerColorThatJustMovedIsWhite
                })
            }
        })

        
    }

    startDragging = (e) => {
        this.setState({
            draggedPieceTargetId: e.target.attrs.id
        })
    }


    movePiece = (selectedId, finalPosition, currentGame, isMyMove) => {
        /**
         * "update" is the connection between the model and the UI. 
         * This could also be an HTTP request and the "update" could be the server response.
         * (model is hosted on the server instead of the browser)
         */
        var whiteKingInCheck = false 
        var blackKingInCheck = false
        var blackCheckmated = false 
        var whiteCheckmated = false
        const update = currentGame.movePiece(selectedId, finalPosition, isMyMove)
        
        if (update === "moved in the same position.") {
            this.revertToPreviousState(selectedId) // pass in selected ID to identify the piece that messed up
            return
        } else if (update === "user tried to capture their own piece") {
            this.revertToPreviousState(selectedId) 
            return
        } else if (update === "b is in check" || update === "w is in check") { 
            // change the fill of the enemy king or your king based on which side is in check. 
            // play a sound or something
            if (update[0] === "b") {
                blackKingInCheck = true
            } else {
                whiteKingInCheck = true
            }
        } else if (update === "b has been checkmated" || update === "w has been checkmated") { 
            if (update[0] === "b") {
                blackCheckmated = true
            } else {
                whiteCheckmated = true
            }
        } else if (update === "invalid move") {
            this.revertToPreviousState(selectedId) 
            return
        } 

        // let the server and the other client know your move
        if (isMyMove) {
            socket.emit('new move', {
                nextPlayerColorToMove: !this.state.gameState.thisPlayersColorIsWhite,
                playerColorThatJustMovedIsWhite: this.state.gameState.thisPlayersColorIsWhite,
                selectedId: selectedId, 
                finalPosition: finalPosition,
                gameId: this.props.gameId
            })
        }
        

        this.props.playAudio()   
        
        // sets the new game state. 
        this.setState({
            draggedPieceTargetId: "",
            gameState: currentGame,
            playerTurnToMoveIsWhite: !this.props.color,
            whiteKingInCheck: whiteKingInCheck,
            blackKingInCheck: blackKingInCheck
        })

        if (blackCheckmated) {
            this.setState({ gameOver: true, winner: 'white'});
            this.props.handleDialog(true);
        } else if (whiteCheckmated) {
            this.setState({ gameOver: true, winner: 'black'});
            this.props.handleDialog(true);
        }
    }

    resetGame = () => {
        this.setState({
            gameOver: false,
            winner: null,
            gameState: new Game(this.props.color),
            playerTurnToMoveIsWhite: true,
            whiteKingInCheck: false,
            blackKingInCheck: false,
            gameOver: false,
            winner: null,
            requestingRematch: false,
        });
    };

    
    
    requestRematch = () => {
        // Send a rematch request to the opponent.
        // console.log("Rematch req sent to opponent");
        socket.emit('rematchRequest', this.props.gameId);
        this.setState({ requestingRematch: true });
    };


    endDragging = (e) => {
        const currentGame = this.state.gameState
        const currentBoard = currentGame.getBoard()
        const finalPosition = this.inferCoord(e.target.x() + 90, e.target.y() + 90, currentBoard)
        const selectedId = this.state.draggedPieceTargetId
        this.movePiece(selectedId, finalPosition, currentGame, true)
    }

    revertToPreviousState = (selectedId) => {
        /**
         * Should update the UI to what the board looked like before. 
         */
        const oldGS = this.state.gameState
        const oldBoard = oldGS.getBoard()
        const tmpGS = new Game(true)
        const tmpBoard = []

        for (var i = 0; i < 8; i++) {
            tmpBoard.push([])
            for (var j = 0; j < 8; j++) {
                if (oldBoard[i][j].getPieceIdOnThisSquare() === selectedId) {
                    tmpBoard[i].push(new Square(j, i, null, oldBoard[i][j].canvasCoord))
                } else {
                    tmpBoard[i].push(oldBoard[i][j])
                }
            }
        }

        // temporarily remove the piece that was just moved
        tmpGS.setBoard(tmpBoard)

        this.setState({
            gameState: tmpGS,
            draggedPieceTargetId: "",
        })

        this.setState({
            gameState: oldGS,
        })
    }

 
    inferCoord = (x, y, chessBoard) => {
        // console.log("actual mouse coordinates: " + x + ", " + y)
        /*
            Should give the closest estimate for new position. 
        */
        var hashmap = {}
        var shortestDistance = Infinity
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                const canvasCoord = chessBoard[i][j].getCanvasCoord()
                // calculate distance
                // console.log(canvasCoord);
                const delta_x = canvasCoord[0] - x 
                const delta_y = canvasCoord[1] - y
                const newDistance = Math.sqrt(delta_x**2 + delta_y**2)
                hashmap[newDistance] = canvasCoord
                if (newDistance < shortestDistance) {
                    shortestDistance = newDistance
                }
            }
        }

        return hashmap[shortestDistance]
    }
    

    render() {
        const { gameOver, winner } = this.state;
        // console.log(this.state.gameState.getBoard())
       //  console.log("it's white's move this time: " + this.state.playerTurnToMoveIsWhite)        
        return (
        <React.Fragment>
        <div className='border1' style = {{
            backgroundImage: `url(${Board1})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            transform: `scaleX(${scaleFactor})`,
            transform: `scaleY(${scaleFactor})`,
            marginBlock: "-10px",
            }}
        >
            <Stage width={720 * scaleFactor} height={720 * scaleFactor} scale={{ x: scaleFactor, y: scaleFactor }}>
                <Layer>
                {this.state.gameState.getBoard().map((row) => {
                    return (<React.Fragment>
                    {row.map((square,ind) => {
                        if (square.isOccupied()) {                                    
                            return (
                            <Piece
                                key= {ind} 
                                x = {square.getCanvasCoord()[0]}
                                y = {square.getCanvasCoord()[1]} 
                                imgurls = {piecemap[square.getPiece().name]}
                                isWhite = {square.getPiece().color === "white"}
                                draggedPieceTargetId = {this.state.draggedPieceTargetId}
                                onDragStart = {this.startDragging}
                                onDragEnd = {this.endDragging}
                                id = {square.getPieceIdOnThisSquare()}
                                thisPlayersColorIsWhite = {this.props.color}
                                playerTurnToMoveIsWhite = {this.state.playerTurnToMoveIsWhite}
                                whiteKingInCheck = {this.state.whiteKingInCheck}
                                blackKingInCheck = {this.state.blackKingInCheck}
                                />)
                        }
                        return
                        })}
                            </React.Fragment>)
                    })}
                </Layer>
            </Stage>
        </div>
        {this.props.showDialog && (
            <div className="game-over-dialog">
                {winner === 'white' ? (
                    <div>WHITE WON BY CHECKMATE!</div>
                ) : (
                    <div>BLACK WON BY CHECKMATE!</div>
                )}

                <button onClick={this.requestRematch} disabled={this.state.requestingRematch}>
                    {this.state.requestingRematch ? 'Requesting Rematch...' : 'Play Again'}
                </button>
                <button onClick={this.props.closeDialog}>Cancel</button>
            </div>
        )}
        </React.Fragment>)
    }
}



const ChessGameWrapper = (props) => {
    /**
     * player 1
     *      - socketId 1
     *      - socketId 2 ???
     * player 2
     *      - socketId 2
     *      - socketId 1
     */



    // get the gameId from the URL here and pass it to the chessGame component as a prop. 
    const domainName = 'http://localhost:3000'
    const color = React.useContext(ColorContext)
    const { gameid } = useParams()
    const [play] = useSound(chessMove);
    const [opponentSocketId, setOpponentSocketId] = React.useState('')
    const [opponentDidJoinTheGame, didJoinGame] = React.useState(false)
    const [opponentUserName, setUserName] = React.useState('')
    const [gameSessionDoesNotExist, doesntExist] = React.useState(false)

    const [showRematchNotification, setShowRematchNotification] = React.useState(false);
    const [restartingGame, setRestartingGame] = React.useState(false);
    const [showDialog, setShowDialog] = React.useState(false);

    // console.log(chessboardThemes[color.selectedTheme]);
    const history = useHistory()
    const chessGameRef = useRef();

    React.useEffect(() => {
        Board1 = chessboardThemes[color.selectedTheme] ;
        socket.on("playerJoinedRoom", statusUpdate => {
            // console.log("A new player has joined the room! Username: " + statusUpdate.userName + ", Game id: " + statusUpdate.gameId + " Socket id: " + statusUpdate.mySocketId)
            if (socket.id !== statusUpdate.mySocketId) {
                setOpponentSocketId(statusUpdate.mySocketId)
            }
        })
    
        socket.on("status", statusUpdate => {
            // console.log(statusUpdate)
            alert(statusUpdate)
            if (statusUpdate === 'This game session does not exist.' || statusUpdate === 'There are already 2 people playing in this room.') {
                doesntExist(true)
            }
        })
        
    
        socket.on('start game', (opponentUserName) => {
            // console.log("START!")
            if (opponentUserName !== props.myUserName) {
                setUserName(opponentUserName)
                didJoinGame(true) 
            } else {
                // in chessGame, pass opponentUserName as a prop and label it as the enemy. 
                // in chessGame, use reactContext to get your own userName
                // socket.emit('myUserName')
                socket.emit('request username', gameid)
            }
        })
    
    
        socket.on('give userName', (socketId) => {
            if (socket.id !== socketId) {
                // console.log("give userName stage: " + props.myUserName)
                socket.emit('recieved userName', {userName: props.myUserName, gameId: gameid})
            }
        })
    
        socket.on('get Opponent UserName', (data) => {
            if (socket.id !== data.socketId) {
                setUserName(data.userName)
                // console.log('data.socketId: data.socketId')
                setOpponentSocketId(data.socketId)
                didJoinGame(true) 
            }
        })      

        socket.on('rematchRequest', (gameId) => {
            // console.log("Rematch req sent to received");
            setShowRematchNotification(true);
        });  

        //opponent reset their states
        socket.on('rematchAccepted', () => {
            // console.log('Rematch accepted.');
            setRestartingGame(true);
            setRestartingGame(true);
            setShowDialog(false);
            chessGameRef.current.resetGame();
            setRestartingGame(false);
        });

        socket.on('rematchDeclined', () => {
            // console.log('Rematch declined.');
            setRestartingGame(false);
            setShowRematchNotification(false);
            // chessGameRef.current.requestRematch();

        });
    }, [])
    const handleDialog = (val) => {
        setShowDialog(val);
    };

    //user reset their states
    const handleRematchAccepted = () => {
        socket.emit('rematchAccepted', gameid); 
        setRestartingGame(true);
        setShowRematchNotification(false);      
        setShowDialog(false);
        chessGameRef.current.resetGame();
        setRestartingGame(false);
    };

    const handleRematchDeclined = () => {
        socket.emit('rematchDeclined', gameid);
        setRestartingGame(false);
        setShowRematchNotification(false);      
    };

    const closeDialog = () => {
        setShowDialog(false);
    };
    

    return (
      <React.Fragment>
        {opponentDidJoinTheGame ? (
          <div className='chessgame'>
            <div style={{ marginRight: "50px" }}>
                <h4 className='player'> Opponent: <strong>{opponentUserName} </strong> </h4>
                <ChessGame
                    playAudio={play}
                    gameId={gameid}
                    color={color.didRedirect}
                    themeUrl={chessboardThemes[color.selectedTheme]} 
                    showDialog={showDialog}
                    handleDialog={handleDialog}
                    closeDialog={closeDialog}
                    restartingGame={restartingGame}
                    ref={chessGameRef}
                />
                <h4 className='player'> You: <strong>{props.myUserName} </strong> </h4>
            </div>
            

            
            <VideoChatApp
                mySocketId={socket.id}
                opponentSocketId={opponentSocketId}
                myUserName={props.myUserName}
                opponentUserName={opponentUserName}
                showRematchNotification={showRematchNotification}
                handleRematchAccepted={handleRematchAccepted}
                handleRematchDeclined={handleRematchDeclined}
                restartingGame={restartingGame}
            />
          </div>
        ) : gameSessionDoesNotExist ? (
          <div>
            <Link to="/" style={{ textAlign: "center", marginTop: "200px" }}> :( Back to Home </Link>
          </div>
        ) : (
          <>
            <div className='queengirl'>
                <img src={queengirl} alt="" />
                <div className='welcome'>
                    <h1 >Welcome to PChess </h1>
                    <p>Enjoy Chess with Friend!</p>
                    <img src={logogif} alt="" />
                </div>
            </div>

            <h1 className='greeting'>
              Hello, <strong>{props.myUserName}</strong> Welcome to a world of endless possibilities. Explore our  services crafted to enrich your life 
            </h1>

            <div className='flexy'>

            <p>Copy and paste the URL below to send to your friend:</p> 
            <textarea
              readOnly
              value = {domainName + "/game/" + gameid}
              type = "text">
            </textarea>
            </div>
            
            <br></br>

            <ShareButtons gameid={gameid} />
            <h1 className='flexy wait'>
              Waiting for the opponent to join the game...{" "}
            </h1>
            <button className='cancelbtn' onClick={() => history.push('/play')}>Cancel</button>
          </>
        )}
      </React.Fragment>
    );
};

export default ChessGameWrapper
