// Inside the ProfileSearch component
import React, { useState } from 'react';
import './ProfileSearch.css';

function ProfileSearch() {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`https://api.chess.com/pub/player/${username}`);
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setShowDetails(false); // Reset to hide details when a new user is searched
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchPlayerData = async () => {
    try {
      const response = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
      if (response.ok) {
        const data = await response.json();
        setPlayerStats(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="profile-container">
      {/* start header continer */}
      <div className="headerContainer">
        <div className="search-container">
          <h1>Chess Profile Search</h1>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={fetchProfileData}>Search</button>
        </div>

        <div className="search-container">
          <h1>Player Stats</h1>
          <button onClick={fetchPlayerData} disabled={!username.length > 0}>
            Search
          </button>
        </div>
      </div>
      {/* till header container */}
      <div className="ProfileSearch">
        <div className="MainData marignright100">
          {profileData && (
            <div className="profile-data">
              <h2>Player: <strong className='name'>{profileData.name} </strong> </h2>
              <img src={profileData.avatar} alt="Player Avatar" />
              <p style={{marginTop: "10px"}}>Username: <span className='highlight'>{profileData.username} </span></p>
              <p>Followers: {profileData.followers}</p>
              <p>Country: {profileData.country.split('/').pop()}</p>
              <p>Location: {profileData.location}</p>
              <p>
                Last Online:{" "}
                {new Date(profileData.last_online * 1000).toLocaleDateString()}
              </p>
              <p>
                Joined:{" "}
                {new Date(profileData.joined * 1000).toLocaleDateString()}
              </p>
              <p>Status: {profileData.status}</p>
              <p>League: {profileData.league}</p>
              {showDetails ? (
                <div>
                <hr />
                  <h3>Additional Details:</h3>
                  <p>Player ID: {profileData.player_id}</p>
                  <p>
                    Profile URL:{" "}
                    <a
                      href={profileData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profileData.url}
                    </a>
                  </p>
                  <p>Is Streamer: {profileData.is_streamer ? "Yes" : "No"}</p>
                  <p>Verified: {profileData.verified ? "Yes" : "No"}</p>
                </div>
              ) : (
                <button onClick={toggleDetails}>Show More</button>
              )}
            </div>
          )}
        </div>

        <div className="MainData">
          {playerStats && (
            <div className="profile-data">
              <h2>Chess.com Statistics for <strong className='name'>{username} </strong></h2>
              <div className="section">
              <hr />
                <h3>Chess Daily</h3>
                <p>Last Rating: {playerStats.chess_daily.last.rating}</p>
                <p>
                  Last Rating Date:{" "}
                  {new Date(
                    playerStats.chess_daily.last.date * 1000
                  ).toLocaleDateString()}
                </p>
                <p>Best Rating: {playerStats.chess_daily.best.rating}</p>
                <p>
                  Best Game:{" "}
                  <a
                    href={playerStats.chess_daily.best.game}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Game
                  </a>
                </p>
                <p>Record - Win: {playerStats.chess_daily.record.win}</p>
                <p>Record - Loss: {playerStats.chess_daily.record.loss}</p>
                <p>Record - Draw: {playerStats.chess_daily.record.draw}</p>
              </div>
              <hr />
              <div className="section">
                <h3>Chess Rapid</h3>
                <p>Last Rating: {playerStats.chess_rapid.last.rating}</p>
                <p>
                  Last Rating Date:{" "}
                  {new Date(
                    playerStats.chess_rapid.last.date * 1000
                  ).toLocaleDateString()}
                </p>
                <p>Best Rating: {playerStats.chess_rapid.best.rating}</p>
                <p>
                  Best Game:{" "}
                  <a
                    href={playerStats.chess_rapid.best.game}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Game
                  </a>
                </p>
                <p>Record - Win: {playerStats.chess_rapid.record.win}</p>
                <p>Record - Loss: {playerStats.chess_rapid.record.loss}</p>
                <p>Record - Draw: {playerStats.chess_rapid.record.draw}</p>
              </div>
              <hr />
              <div className="section">
                <h3>Chess Bullet</h3>
                <p>Last Rating: {playerStats.chess_bullet.last.rating}</p>
                <p>
                  Last Rating Date:{" "}
                  {new Date(
                    playerStats.chess_bullet.last.date * 1000
                  ).toLocaleDateString()}
                </p>
                <p>Best Rating: {playerStats.chess_bullet.best.rating}</p>
                <p>
                  Best Game:{" "}
                  <a
                    href={playerStats.chess_bullet.best.game}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Game
                  </a>
                </p>
                <p>Record - Win: {playerStats.chess_bullet.record.win}</p>
                <p>Record - Loss: {playerStats.chess_bullet.record.loss}</p>
                <p>Record - Draw: {playerStats.chess_bullet.record.draw}</p>
              </div>
              <hr />
              <div className="section">
                <h3>Chess Blitz</h3>
                <p>Last Rating: {playerStats.chess_blitz.last.rating}</p>
                <p>
                  Last Rating Date:{" "}
                  {new Date(
                    playerStats.chess_blitz.last.date * 1000
                  ).toLocaleDateString()}
                </p>
                <p>Best Rating: {playerStats.chess_blitz.best.rating}</p>
                <p>
                  Best Game:{" "}
                  <a
                    href={playerStats.chess_blitz.best.game}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Game
                  </a>
                </p>
                <p>Record - Win: {playerStats.chess_blitz.record.win}</p>
                <p>Record - Loss: {playerStats.chess_blitz.record.loss}</p>
                <p>Record - Draw: {playerStats.chess_blitz.record.draw}</p>
              </div>
              <hr />
              <div className="section">
                <h3>FIDE Rating: {playerStats.fide}</h3>
              </div>
              <hr />
              <div className="section">
                <h3>Tactics</h3>
                <p>Highest Rating: {playerStats.tactics.highest.rating}</p>
                <p>Lowest Rating: {playerStats.tactics.lowest.rating}</p>
              </div>
              <hr />
              <div className="section">
                <h3>Puzzle Rush</h3>
                <p>Best Score: {playerStats.puzzle_rush.best.score}</p>
                <p>
                  Total Attempts: {playerStats.puzzle_rush.best.total_attempts}
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProfileSearch;
