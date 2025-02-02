export const Circles = ({ images = [] }) => {
  console.log("CIRCLE ", images);

  // Ensure `images` is an array before mapping
  const processedImages = Array.isArray(images) 
    ? images.map(i => (i ? i : null)) 
    : [null, null, null, null];

  // Ensure `processedImages` has at least 4 values
  while (processedImages.length < 4) {
    processedImages.push(null);
  }

  console.log("PROCESSED", processedImages)

  return (
    <ul className="circles">
      <li >
        {processedImages[0] && <img src={processedImages[0]}/> }
      </li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li >
      {processedImages[1] &&<img src={processedImages[1]}/> }
      </li>
      <li >
      {processedImages[2] &&<img src={processedImages[2]}/>}
      </li>
      <li></li>
      <li></li>
      <li >
      {processedImages[3] &&<img src={processedImages[3]}/>}
      </li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
};
