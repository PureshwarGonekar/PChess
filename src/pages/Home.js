import React, {useState} from 'react';

import './Home.css'

const Home = () => {
   const [selectedMenuItem, setSelectedMenuItem] = useState('Home');

  // Function to handle menu item clicks and update the selected menu item
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
  return (
      <section className='rightmain'>
        <div className="chessboard">
          <img className='chessOsmImg' src={require('../img/chessOsm.jpg')}/>
        </div>
        <div className='title'>
          <h1 className='hometitle '>Play Chess Online</h1>
          <p className=' '>Play with Video Streaming</p>
          <button className='bigbtn'><img className='icon_size2' src={require('../img/playchess.png')}/> <h1>Play Online</h1> </button>
        </div>
      </section>
  )
}

export default Home;