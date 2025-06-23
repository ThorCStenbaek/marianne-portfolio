import React, { useState } from "react";
import YouTubeEmbed from "./YoutubeEmbed";
import { Circles } from "./mini/Circles";
import VimeoEmbed from "./VimdeoEmbded";
// Example video components
const videoOne = <VimeoEmbed videoId={"1052758376"} />;
const videoOneImages=[]
const videoTwo = <VimeoEmbed videoId={"1095677006"} />;
const videoTwoImages=[]
const image1 = "/Images/video1.jpg"
const image2= "/Images/video2.jpg"

const CustomButton = ({ text, onClick, state=false, selected = false, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleIsHover = (bool)=>{
    setIsHovered(bool)
    onHover(bool)
  }

  // Determine background color based on state:
  // - If selected, use a darker tone.
  // - Otherwise, use the hover state color if hovering, else the default color.
  const backgroundColor = selected
    ? "rgb(0, 150, 200)"
    : isHovered
    ? "rgb(104, 217, 255)"
    : "rgb(0, 198, 255)";

  const buttonStyle = {
    background: backgroundColor,
    color: "white",
    border: "none", // Remove default border
    outline: "none", // Remove focus outline
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    width: state ? "50%" : "25%",
    height: "50px",
    cursor: "pointer", // Shows pointer on hover
    fontWeight: "600", // Bold text
    fontSize: "1rem", // Adjust size as needed
    fontFamily: "Arial, sans-serif", // Change to your preferred font family
    transition: "background 0.3s ease, transform 0.2s ease",
    borderRadius: isHovered || state ? "0px" : "5px",
    transform: isHovered && !state ? "scale(1.05)" : "scale(1)",
    // Remove any margin if used inside a flex container
    margin: state ? 0 : "10%"
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={() => handleIsHover(true)}
      onMouseLeave={() => handleIsHover(false)}
      
    >
      {text}
    </button>
  );
};

const ChooseVideo = () => {
  const [chosenVideo, setChosenVideo] = useState(null);

  const [amHovering, setAmHovering] =useState(null)

  const handleChooseVideo = (video) => {
    setChosenVideo(video);
  };

  const hoverOne = (bool) =>{
    bool ? setAmHovering(1) : setAmHovering(null)
  }

  const hoverTwo = (bool) =>{
    bool ? setAmHovering(2) : setAmHovering(null)
  }

  // When a video is chosen, display it with buttons overlaid at the top.
  if (chosenVideo) {
    return (
      <div style={{ position: "relative", height: "fit-content", background: "black" }}>
        {/* Overlay Buttons */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            zIndex: 2
          }}
        >
          <CustomButton
            text="GROOM REEL"
            state={true}
            onHover={()=> console.log("a")}
            selected={chosenVideo === "videoOne"}
            onClick={() => handleChooseVideo("videoOne")}
          />
          <CustomButton
            text="ENVIRONMENT REEL"
            state={true}
            onHover={()=> console.log("a")}

            selected={chosenVideo === "videoTwo"}
            onClick={() => handleChooseVideo("videoTwo")}
            
          />
        </div>
        {/* Video Container */}
        <div style={{ paddingTop: "50px" }}>
          {chosenVideo === "videoOne" ? videoOne : videoTwo}
        </div>
      </div>
    );
  }

  
  // Initial state: no video chosen.
  // Show a full-screen gradient background with centered buttons.
  return (
    <div className="chooseVideoContainer"

    >
        <Circles images={amHovering ? amHovering==1 ? videoOneImages : videoTwoImages : null}/>
    

                  <div style={{width: "50%", position: "absolute", left: "0", height:"100%"}}>
            <img src={image1} alt="Video One" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{width: "50%", position: "absolute", right:"0", height:"100%"}}>
            <img src={image2} alt="Video One" style={{ width: "100%", height: "100%",  objectFit: "cover" }} />
          </div>
        <CustomButton
          text="GROOM REEL"
          onHover={hoverOne}
        
     
          onClick={() => handleChooseVideo("videoOne")}
        />
        <CustomButton
          text="ENVIRONMENT REEL"            
          onHover={hoverTwo}

 
          onClick={() => handleChooseVideo("videoTwo")}
        />

    </div>
  );
};

export default ChooseVideo;
