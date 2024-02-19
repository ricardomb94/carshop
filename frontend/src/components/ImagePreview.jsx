import React from "react";

const ImagePreview = ({ src, alt }) => {
  return (
    <div className='image-preview'>
      <img src={src} alt={alt} />
    </div>
  );
};

export default ImagePreview;
