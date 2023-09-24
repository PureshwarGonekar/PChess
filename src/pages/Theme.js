import React from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import mygif from "../img/logo.gif";
import './Theme.css'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  }
};
const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000'
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '400px'
}
const slideImages = [
  {
    url: require('../img/slider1.jpg'),
    caption: 'Slide 1'
  },
  {
    url: require('../img/slider2.jpg'),
    caption: 'Slide 2'
  },
  {
    url: require('../img/slider3.jpg'),
    caption: 'Slide 3'
  },
  {
    url: require('../img/slider4.jpg'),
    caption: 'Slide 3'
  },
  {
    url: require('../img/slider5.jpg'),
    caption: 'Slide 3'
  },
  {
    url: require('../img/chessOsm.jpg'),
    caption: 'Slide 3'
  },
];


const chessboardThemes = [
  {
    name: 'default',
    url: require('../chess/assets/chessBoard.png'),
  },
  {
    name: 'theme1',
    url: require('../chess/assets/chessBoard1.png'),
  },
  {
    name: 'theme2',
    url: require('../chess/assets/chessBoard2.png'),
  }
  
];

const Theme = ({selectedTheme, handleThemeChange}) => {
    const showAlert = (themeName) => {
      window.alert(`You have selected the "${themeName}" theme.`);
    };
    return (
      <div className="themeContainer">
      <div className='cont'>
        <img src={mygif} alt="PchessGIF" />

        <div className="slider">
          <h1>Theme</h1>
          <Slide>
          {slideImages.map((slideImage, index)=> (
              <div key={index}>
                <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                  {/* <span style={spanStyle}>{slideImage.caption}</span> */}
                </div>
              </div>
            ))} 
          </Slide>
        </div>
      </div>
      <div className='choosetheme'>
        <h1>Choose one of Chessboard</h1>
        <div className="parent">
          {/* <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={true}
            infinite={true}
            partialVisible={false}
            dotListClass="custom-dot-list-style"
          > */}
            {chessboardThemes.map((theme, index) => {
              return (
                <div className="multislider" key={index}>
                  <img src={theme.url} alt="theme" />
                  <button className='themebtn' onClick={() =>{
                    handleThemeChange(theme.name);
                    showAlert(theme.name);
                  }}>
                    {selectedTheme===theme.name ? 'Selected' : `Select the  ${theme.name}`} 
                  </button>
                </div>
              );
            })}
          {/* </Carousel> */}
        </div>
      </div>
      </div>
    )
}
export default Theme