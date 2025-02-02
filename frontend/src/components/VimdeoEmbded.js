import React from 'react';

function VimeoEmbed({ videoId }) {
  return (
    <div className="vimeo-embed">
      <iframe
        width="100%"
        height="500"
        src={`https://player.vimeo.com/video/${videoId}`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Embedded Vimeo Video"
      ></iframe>
    </div>
  );
}

export default VimeoEmbed;
