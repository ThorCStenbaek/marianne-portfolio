export const Software = ({ tech, onClick = () => { console.log("hwat") }, isSelected = false, size=1.0 }) => {
    
  const     width= 50;
  const   height= 50;

  const divWidth= 200;
  const fontSize= 1.2
  
  return (
      <div
        style={{ background: isSelected ? 'green' : '#fff', width: divWidth*size+"px"}}
        onClick={onClick} // Corrected to "onClick"
        className="software-item"
      >
        <img style={{width: width*size+"px", height: height*size+"px"}} className="software-icon" src={`/${tech.image}`} alt={tech.name} />
        <span style={{fontSize: fontSize*size+"em"}} className="software-name">{tech.name}</span>
      </div>
    );
  };
  