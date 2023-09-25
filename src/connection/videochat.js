  import React, { useEffect, useState, useRef } from 'react';
  import Peer from "simple-peer";
  import styled from "styled-components";
  import videocall from '../img/videocall.png'
  import { socket, mySocketId } from '../connection/socket';


  const Video = styled.video`
    border: 2px solid black;
  `;

  const VideoChatApp = (props) =>{
    /**
     * initial state: both player is neutral and have the option to call each other
     * 
     * player 1 calls player 2: Player 1 should display: 'Calling {player 2 username},' and the 
     *                          'CallPeer' button should disappear for Player 1.
     *                          Player 2 should display '{player 1 username} is calling you' and
     *                          the 'CallPeer' button for Player 2 should also disappear. 
     * 
     * Case 1: player 2 accepts call - the video chat begins and there is no button to end it.
     * 
     * Case 2: player 2 ignores player 1 call - nothing happens. Wait until the connection times out. 
     * 
     */

    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [isCalling, setIsCalling] = useState(false)
    const userVideo = useRef();
    const partnerVideo = useRef();

    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      })

      socket.on("hey", (data) => {
        setReceivingCall(true);
        setCaller(data.from);
        setCallerSignal(data.signal);
      })

      return () => {
          // Remember to clean up the event listener when the component unmounts
          socket.off("hey");
      };
    }, []);

    function callPeer(id) {
      setIsCalling(true)
      const peer = new Peer({
          initiator: true,
          config: {
            iceServers: [
              {
                urls: 'stun:stun.l.google.com:19302', // Example STUN server URL
              },
            ],
          },
        trickle: false,
        stream: stream,
      });

      peer.on("signal", data => {
        socket.emit("callUser", { userToCall: id, signalData: data, from: props.mySocketId})
      })

      peer.on("stream", stream => {
        if (partnerVideo.current) {
          partnerVideo.current.srcObject = stream;
        }
      });

      socket.on("callAccepted", signal => {
        setCallAccepted(true);
        peer.signal(signal);
      })

    }

    function acceptCall() {
      // if (!peer || !callerSignal) {
      //   // Handle the case where peer or callerSignal is not available
      //   console.log("Peer is not available");
      //   return;
      // }
      setCallAccepted(true);
      setIsCalling(false)
      const peer = new Peer({
        initiator: false,
        config: {
          iceServers: [
            {
              urls: 'stun:stun.l.google.com:19303', // Example STUN server URL
            },
          ],
        },
        trickle: false,
        stream: stream,
      });
      peer.on("signal", data => {
        socket.emit("acceptCall", { signal: data, to: caller })
      })

      peer.on("stream", stream => {
        partnerVideo.current.srcObject = stream;
      });

      peer.signal(callerSignal);
    }

    let UserVideo;
    if (stream) {
      UserVideo = (
        <Video playsInline muted ref={userVideo} autoPlay style = {{width: "100%", height: "100%"}} />
      );
    }

    let mainView;
    let item;

    if (callAccepted) {
      mainView = (
        <Video playsInline ref={partnerVideo} autoPlay style = {{width: "100%", height: "100%"}} />
      );
    } else if (receivingCall) {
      item = (
        <div className='blocky'>
          <div className='notification'>
            <img className='rotate' src={videocall} alt="" />
            <p className='imptext'>{props.opponentUserName} is calling you</p>
          </div>

          <div className='flexy'>
            <button className='answer' onClick={acceptCall}>Accept</button>
            <button className='reject' onClick={acceptCall}>Decline</button>
          </div>
        </div>
      )
    } else if (isCalling) {
      item = (
        <div className='notification'>
          <p className='imptext'>Currently calling {props.opponentUserName}...</p>
        </div>
      )
    } else {
      item = (
        <button className='notification imptext' onClick = {() => {
          callPeer(props.opponentSocketId)
        }}>
        <p className='imptext'>Chat with your friend while you play!</p></button>
      )
    }



    return (
    <div className='videochat_bar'>
        <div className='blocky'>
          <h1 className='heading' >Notifications</h1>
          <hr style={{color: "white", fontSize: "400"}} />
          {item}
          
        </div>
        <div className='mainview'>
          {mainView}
        </div>
        <div className='bottomright'>
          {UserVideo }
        </div>
    </div>
      
    );
  }

  export default VideoChatApp;
