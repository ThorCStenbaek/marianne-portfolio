import React, { useState } from "react";
import YouTubeEmbed from "./YoutubeEmbed";
import { Circles } from "./mini/Circles";
import VimeoEmbed from "./VimdeoEmbded";
// Example video components
const videoOne = <VimeoEmbed videoId={"1052758376"} />;
const videoOneImages=["/Images/3mermaze_02.jpg", "/Images/marianne-riis-blaesbjerg-muggesofia2.jpg", "/Images/Ocelot_1.jpg", "/Images/Ocelot_6.jpg"]
const videoTwo = <VimeoEmbed videoId={"1052761559"} />;
const videoTwoImages=["/Images/bladerunnerEnv.jpg", "/Images/Nomads_1.jpg", "/Images/marianne-riis-blaesbjerg-qvist-001-06hat-x1-0001.jpg", "/Images/Ocelot_2.jpg"]

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
            text="GENERALIST REEL"
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
    <div
      style={{
        height: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #0070f3, #00c6ff)",
        position: 'relative'
      }}
    >
        <Circles images={amHovering ? amHovering==1 ? videoOneImages : videoTwoImages : null}/>
    
        <CustomButton
          text="GROOM REEL"
          onHover={hoverOne}
        
     
          onClick={() => handleChooseVideo("videoOne")}
        />
        <CustomButton
          text="GENERALIST REEL"            
          onHover={hoverTwo}

 
          onClick={() => handleChooseVideo("videoTwo")}
        />

    </div>
  );
};

export default ChooseVideo;
