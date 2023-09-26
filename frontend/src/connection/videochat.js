import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Peer from "simple-peer";
import styled from "styled-components";
import videocall from '../img/videocall.png'
import hangup from '../img/hang-up.png';
import cameraOn from '../img/camera-on.png';
import cameraOff from '../img/camera-off.png';
import { socket, mySocketId } from '../connection/socket';


  const Video = styled.video`
    border: 2px solid black;
  `;

  const VideoChatApp = (props) =>{
    const history = useHistory()

    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [isCalling, setIsCalling] = useState(false)

    const [callEnded, setCallEnded] = useState(false);

    const [cameraEnabled, setCameraEnabled] = useState(true);

    const userVideo = useRef();
    const partnerVideo = useRef();

    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((userStream) => {
      setStream(userStream);
      if (userVideo.current) {
        userVideo.current.srcObject = userStream;
      }
    });

      socket.on("hey", (data) => {
        setReceivingCall(true);
        setCaller(data.from);
        setCallerSignal(data.signal);
      })
      
      socket.on("endCall", () => {
        setCallAccepted(false);
        setCallEnded(true);
        setIsCalling(false);
        setReceivingCall(false);
        setReceivingCall(false);
      });

      return () => {
          // Remember to clean up the event listener when the component unmounts
          socket.off("hey");
          socket.off("endCall");
      };
    }, []);

    const toggleCamera = () => {
      if (stream) {
        // Get the current tracks
        const tracks = stream.getTracks();
        
        // Disable the video track if the camera is enabled or enable it if it's disabled
        tracks.forEach(track => {
          if (track.kind === 'video') {
            track.enabled = !cameraEnabled;
          }
        });

        setCameraEnabled(!cameraEnabled);
      }
    };
    const handleAbortButtonClick = () => {
      // Notify the other player to end the call (if it's ongoing)
      if (callAccepted) {
        socket.emit("endCall", { to: props.opponentSocketId });
      }
      history.push('/');
    };

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
        setCallEnded(false);
        peer.signal(signal);
      })

    }

    function acceptCall() {

      setCallAccepted(true);
      setIsCalling(false)
      setCallEnded(false);
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

    const endCall = () => {
      if (callAccepted) {
        // Notify the other player to end the call
        socket.emit("endCall", { to: props.opponentSocketId });

        // Additional clean-up actions if needed
        setCallAccepted(false);
        setCallEnded(true);
        setIsCalling(false);
        setReceivingCall(false);
      }
      
    };


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
          {props.showRematchNotification && (
              <div className="blocky">
                <div className='notification'>
                  <p className='imptext'>You received a rematch request.</p>
                </div>
                <div className='flexy'>
                  <button className='answer' onClick={props.handleRematchAccepted}>Accept</button>
                  <button className='reject' onClick={props.handleRematchDeclined}>Decline</button>
                </div>
              </div>
          )}
          {props.restartingGame && (
              <div className="game-restarting-notification">
              
                  <p>Restarting the game...</p>
              </div>
          )}
        </div>
        <div className='mainview blocky'>
          {mainView}
          {callAccepted && !callEnded && (
            <button className='hangup' onClick={endCall}>
              <img src={hangup} alt="" />
              <p >Hang Up</p>
            </button>
          )}
        </div>

        <button className='toggle-camera' onClick={toggleCamera}>
          <img src={cameraEnabled ? cameraOn : cameraOff} alt="" />
          <p>{cameraEnabled ? 'Off' : 'On'}</p>
        </button>
        <div className='bottomright'>
          {UserVideo }
        </div>

        <button className='toggle-camera abort-button ' onClick={handleAbortButtonClick}>
          <p>Abort</p>
        </button>

    </div>
      
    );
  }

  export default VideoChatApp;
