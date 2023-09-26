import React, { useState, useRef } from 'react';
import JoinGame from './joingame';
import ChessGame from '../chess/ui/chessgame';

/**
 * Onboard is where we create the game room.
 */

const JoinRoom = (props) => {
    const [didGetUserName, setDidGetUserName] = useState(false);
    const [inputText, setInputText] = useState("");
    const textArea = useRef(null);

    const typingUserName = () => {
        // grab the input text from the field from the DOM 
        const typedText = textArea.current.value;

        // set the state with that text
        setInputText(typedText);
    }
    const handleSubmit = event => {
        event.preventDefault();
    // When the 'Submit' button gets pressed from the username screen,
    // We should send a request to the server to create a new room with
    // the uuid we generate here.
        setDidGetUserName(true);
        // console.log('form submitted ✅');
    };

    return (
        <React.Fragment>
            {didGetUserName ? (
                <React.Fragment>
                    <JoinGame userName={inputText} isCreator={false} />
                    <ChessGame myUserName={inputText} />
                </React.Fragment>
            ) : (
                <form className='Play_screen' onSubmit={handleSubmit}>
                        <div className='Play_container'>

                            <h1> Your Username: </h1>
                            <input
                                ref={textArea}
                                onInput={typingUserName}
                            />
                            <button
                                className="btn btn-primary"
                                disabled={!inputText.length > 0}>
                                Submit
                            </button>
                        </div>
                </form>
            )}
        </React.Fragment>
    );
}

export default JoinRoom;
