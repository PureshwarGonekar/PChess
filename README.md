# Pchess - Online Chess with Video Chat

Welcome to Pchess, an online chess platform that allows users to play chess online with video chat. This Single Page Web Application (SPA) is built using React and Express Node.js and leverages various technologies to provide a seamless chess-playing experience.


## Features

- **Real-Time Chess**: Pchess uses the chess.js React library and WebSocket.io to implement the chess logic and real-time connections between players. Enjoy playing chess with your friends or random opponents in real-time. Users can play their friends anonymously via link.

- **Video Chat**: Connect with your opponent via video chat using the simple-peer library. Discuss your strategies, chat about the game, or simply enjoy a friendly conversation while playing chess.

- **Drag and Drop**: Pchess integrates the React Konva library to enable a smooth and intuitive chess piece movement. Simply drag and drop pieces to their valid locations on the board.

- **Chess Board Themes**: Customize your chessboard with different themes. Choose from a variety of visually appealing themes to enhance your gaming experience.

- **Player Stats**: Access your chess statistics by connecting to chess.com's APIs. Keep track of your performance and see how you compare with other players.

- **Chess Blog**: Explore chess-related blogs from other users and share your thoughts by posting your own blogs (Note: This feature is not yet implemented).

- **User Authentication**: Pchess offers user login and sign-up functionality, although the authentication part is not yet implemented.

## Snapshots


## Installation

To run Pchess locally, follow these steps:

1. Clone the repository:
2. Install dependencies for the frontend and backend:
3. Start the frontend and backend servers:
4. Open your web browser and navigate to `http://localhost:3000` to access Pchess.

## Deployment

- Backend: The project backend is deployed on [Glitch.com](https://glitch.com/) because it supports WebSocket.io connections.
<br>
Seperate repository for [backend]()

- Frontend: The project frontend is deployed on [Vercel.com](https://vercel.com/).
<br>
Seperate repository for [frontend](https://github.com/PureshwarGonekar/pchess_frontend)

## Usage

- Register an account or simply play as a guest.
- Select a chessboard theme that suits your style.
- Start a new chess game and invite a friend or play with a random opponent.
- Use the intuitive drag-and-drop interface to make your moves.
- Enjoy video chat with your opponent as you play.
- Explore player stats and chess-related blogs .

## Contributing

I welcome contributions to Pchess! Feel free to submit issues, fork the repository, and create pull requests to help improve this project.



## Acknowledgments

- [chess.js](https://github.com/jhlywa/chess.js) - Chess logic library
- [React Konva](https://konvajs.org/) - Drag-and-drop library for React
- [WebSocket.io](https://socket.io/) - Real-time communication library
- [simple-peer](https://github.com/feross/simple-peer) - WebRTC video chat library
- [Chess.com API](https://www.chess.com/news/view/published-data-api) - Chess statistics data source

Thank you for choosing Pchess! Enjoy your chess-playing experience with friends and fellow enthusiasts.
