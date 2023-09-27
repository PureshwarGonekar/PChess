import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import './Home.css'

const Home = ({handleMenuItemClick}) => {
  const history = useHistory();
  const createGame = ()=>{
    history.push('/play');
    handleMenuItemClick('Play');
  }
  const joinGame = ()=>{
    history.push('/play');
    handleMenuItemClick('Join');
  }
  return (
      <section className='rightmain'>
        <div className="chessboard">
          <img className='chessOsmImg' alt='icon' src={require('../img/chessOsm.jpg')}/>
        </div>
        <div className='title'>
          <h1 className='hometitle '>Play Chess Online</h1>
          <p className=' '>Play with Video Streaming</p>
          <button onClick={createGame} className='bigbtn'><img className='icon_size2' alt='icon' src={require('../img/playchess.png')} onClick={createGame}/> <h1>Create Game</h1> </button>
          <br />
          <br />
          <button onClick={joinGame} className='bigbtn'><img className='icon_size2' alt='icon' src={require('../img/creategame.png')}/> <h1>Join Game</h1> </button>
        </div>
      </section>
  )
}

export default Home;