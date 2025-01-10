import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ZoomImage from '../ZoomImage';

interface ImageCarouselProps {
  images: Array<{
    src: string;
    alt?: string;
  }>;
}

export default function ImageCarousel({ images }: ImageCarouselProps): JSX.Element {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <ZoomImage src={image.src} alt={image.alt || ''} />
        </div>
      ))}
    </Slider>
  );
} 