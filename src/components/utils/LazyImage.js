import React, { useState, useEffect } from "react";

const placeHolder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";

const LazyImage = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = useState(placeHolder);

  useEffect(() => {
    const imgLoader = new Image();
    imgLoader.onload = () => {
      setImageSrc(src);
    };
    imgLoader.src = src;
  }, []);

  return <img src={imageSrc} alt={alt} />;
};

export default LazyImage;
