import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

const socket  = require('../connection/socket').socket

const JoinSection = () => {
    const history = useHistory();

    const [gameId, setGameId] = useState('');
    
    const onSubmit = () =>{
        history.push(`/game/${gameId}`);
    }
    
  return (
    
    <div className='Play_screen'>
        <div className='Play_container'>
            <div className='width100' style={{marginRight: "-100px"}}>
                <label htmlFor='gameId' > Game Id: </label>
                <input 
                    className='righty'
                    name='gameId'
                    value={gameId}
                    onChange={(e)=> {setGameId(e.target.value)}}
                />
            </div>
        <button
            className="btn btn-primary"
            disabled={!gameId.length > 0}
            onClick={onSubmit}>
            Submit
        </button>
        </div>
    </div>
  )
}

export default JoinSection