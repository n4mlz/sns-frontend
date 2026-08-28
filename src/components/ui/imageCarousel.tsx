"use client";

import { Box, Image } from "@chakra-ui/react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useMemo } from "react";

type ImageCarouselProps = {
  border: string;
  slides: { src: string }[];
};

const ImageCarousel = ({ border, slides }: ImageCarouselProps) => {
  const autoplay = useMemo(() => Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }), []);
  const [viewportRef] = useEmblaCarousel({ loop: true, align: "start" }, [autoplay]);

  return (
    <Box ref={viewportRef} overflow="hidden" w="100%">
      <Box display="flex" gap="10px" paddingX="20px">
        {slides.map((slide, index) => (
          <Box
            key={index}
            flex="0 0 calc((100% - 20px) / 3)"
            minW="0"
            border={border}
            borderColor="gray.500"
            borderRadius="3px">
            <Image src={slide.src} alt="" borderRadius="2px" />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImageCarousel;
