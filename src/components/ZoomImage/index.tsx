import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface ZoomImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

export default function ZoomImage({ src, alt = '', width, height }: ZoomImageProps): JSX.Element {
  return (
    <Zoom>
      <img
        src={src}
        alt={alt}
        style={{
          width: width || 'auto',
          height: height || 'auto',
          cursor: 'zoom-in',
        }}
      />
    </Zoom>
  );
} 