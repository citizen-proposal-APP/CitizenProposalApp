import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { AspectRatio, Box, Image, useMantineTheme } from '@mantine/core';
import classes from './ImageCarousel.module.css';

interface Image {
  image: string;
  link: string;
}

// images: url of images
export function ImageCarousel({ images }: { images: Image[] }) {
  const theme = useMantineTheme();
  const autoplay = useRef(Autoplay({ delay: 2500 }));

  const slides = images.map((image) => (
    <Carousel.Slide key={image.link} className={classes.card}>
      <Box component='a' href={image.link}>
      <AspectRatio ratio={16 / 9}>
        <Image src={image.image} radius="md"/>
      </AspectRatio></Box>
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
