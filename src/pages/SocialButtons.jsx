import React, { useState } from 'react';
import whatsapp from '../img/whatsapp.png';
import fb from '../img/facebook.png';
import tele from '../img/telegram.png';
import clipboard from '../img/clipboard.png';
import copied from '../img/copied.png';

const SocialButtons = ({ gameid }) => {
  const domainName = 'http://localhost:3000';
  const [gameLinkCopied, setGameLinkCopied] = useState(false);

  const copyGameLinkToClipboard = () => {
    const gameLink = `${domainName}/game/${gameid}`;
    navigator.clipboard.writeText(gameLink)
      .then(() => {
        setGameLinkCopied(true);
      })
      .catch((error) => {
        console.error('Failed to copy game link: ', error);
      });
  };

  const shareOnWhatsApp = () => {
    const gameLink = `${domainName}/game/${gameid}`;
    const text = encodeURIComponent(`Join me for a game of chess! ${gameLink}`);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareOnFacebook = () => {
    const gameLink = `${domainName}/game/${gameid}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(gameLink)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareOnTelegram = () => {
    const gameLink = `${domainName}/game/${gameid}`;
    const text = encodeURIComponent(`Join me for a game of chess! ${gameLink}`);
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(gameLink)}&text=${text}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <div className='socials'>
      <button onClick={shareOnWhatsApp}><img src={whatsapp} alt="" /></button>
      <button onClick={shareOnFacebook}><img src={fb} alt="" /></button>
      <button onClick={shareOnTelegram}><img src={tele} alt="" /></button>
      <button onClick={copyGameLinkToClipboard}>
      <img src={gameLinkCopied ? copied : clipboard} alt="" />
        {gameLinkCopied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
};

export default SocialButtons;
