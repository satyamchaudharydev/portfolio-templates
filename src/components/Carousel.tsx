
"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variant } from 'framer-motion';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { Button } from './ui/button';
import { ArrowBigLeft, ArrowUpRight, MoveLeft, MoveRight } from 'lucide-react';

interface CarouselProps {
  images: string[];
}



const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  useEffect(() => {
    const lastIndex = images.length - 1;
    if (currentIndex < 0) {
      setCurrentIndex(lastIndex);
    }
    if (currentIndex > lastIndex) {
      setCurrentIndex(0);
    }
  }, [currentIndex, images]);

  const nextSlide = (): void => {
    setDirection(1);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = (): void => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };
  const goToSlide = (index: number): void => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <div className='flex flex-col'>

      <div className="relative w-full h-96 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="absolute w-full h-full object-cover"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          />
        </AnimatePresence>

       

       

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 text-white bg-[#222321c1] rounded-full px-2 backdrop-blur-lg">
        <Button
          onClick={prevSlide}
          variant={"ghost"}
          className="bg-transparent rounded-full p-2 text-white/50"
        >
          <MoveLeft />
        </Button>
        <Button
          onClick={nextSlide}
          className="bg-transparent rounded-full p-2 text-white/50"
          variant={"ghost"}

        >
          <MoveRight />

        </Button>
        </div>
      </div>
      <div className="mt-10 flex justify-center space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={clsx(["w-16 h-16 rounded-lg overflow-hidden border ",
              index === currentIndex ? "border-white" : "border-gray/35"
        ])}
          >
            <img
              src={image}
              alt={`Preview ${index + 1}`}
              className="w-16 h-16 object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;