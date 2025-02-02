import React from 'react';

function YouTubeEmbed({ videoId }) {
  return (
    <div className="youtube-embed">
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube Video"
      ></iframe>
    </div>
  );
}

export default YouTubeEmbed;
