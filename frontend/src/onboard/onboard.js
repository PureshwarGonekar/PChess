import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { ColorContext } from '../context/colorcontext';

import { socket } from '../connection/socket'; // Assuming you have exported socket as a named export

import './onboard.css';

/**
 * Onboard is where we create the game room.
 */

const CreateNewGame = (props) => {
    const [didGetUserName, setDidGetUserName] = useState(false);
    const [inputText, setInputText] = useState("");
    const [gameId, setGameId] = useState("");

    const textArea = useRef(null);

    const send = () => {
        /**
         * This method should create a new room in the '/' namespace
         * with a unique identifier. 
         */
        const newGameRoomId = uuid();

        // set the state of this component with the gameId so that we can
        // redirect the user to that URL later. 
        setGameId(newGameRoomId);

        // emit an event to the server to create a new room 
        socket.emit('createNewGame', newGameRoomId);
    }

    const typingUserName = () => {
        // grab the input text from the field from the DOM 
        const typedText = textArea.current.value;

        // set the state with that text
        setInputText(typedText);
    }

    return (
        <React.Fragment>
            {didGetUserName ? (
                <Link to={`/game/${gameId}`}>
                <div className='start_the_game '>
                    <button
                        className="Play_container startbtn"
                        onClick={() => {
                            
                        }}
                        >
                        Start 
                    </button>
                </div>
                </Link>
            ) : (
                <div className='Play_screen'>
                    <div className='Play_container'>

                    <h1> Your Username: </h1>
                    <input
                        ref={textArea}
                        onInput={typingUserName}
                    />
                    <button
                        className="btn btn-primary"
                        disabled={!inputText.length > 0}
                        onClick={() => {
                            // When the 'Submit' button gets pressed from the username screen,
                            // We should send a request to the server to create a new room with
                            // the uuid we generate here.
                            props.didRedirect();
                            props.setUserName(inputText);
                            setDidGetUserName(true);
                            send();
                        }}>
                        Submit
                    </button>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

const Onboard = (props) => {
    const color = React.useContext(ColorContext);

    return <CreateNewGame didRedirect={color.playerDidRedirect} setUserName={props.setUserName} />;
}

export default Onboard;
