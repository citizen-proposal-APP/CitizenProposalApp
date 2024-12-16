import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { AspectRatio, Image, useMantineTheme } from '@mantine/core';
import classes from './ImageCarousel.module.css';

// images: url of images
export function ImageCarousel({ images }: { images: string[] }) {
  const theme = useMantineTheme();
  const autoplay = useRef(Autoplay({ delay: 2500 }));

  const slides = images.map((image) => (
    <Carousel.Slide key={image} className={classes.card}>
      <AspectRatio ratio={16 / 9}>
        <Image src={image} radius="md" />
      </AspectRatio>
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize={{ base: '100%', sm: '60%' }}
      slideGap="md"
      loop
      withIndicators
      controlSize={theme.spacing.xl}
      classNames={classes}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      style={{ overflow: 'visible' }}
    >
      {slides}
    </Carousel>
  );
}
