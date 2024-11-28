"use client";
import React from "react";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

import MultiCarousel from "react-multi-carousel";
import { DATA, responsive } from "./constants";
import Arrow from "../Arrow";

const MultiItemCarousel: React.FC = () => {
  return (
    <MultiCarousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      swipeable={true}
      draggable={true}
      showDots={false}
      arrows={true}
      customLeftArrow={<Arrow />}
      customRightArrow={<Arrow className="rotate-180 right-2" />}
      containerClass="carousel-container"
      itemClass="px-2"
    >
      {DATA.map((item, index) => (
        <a
          href={item.url}
          key={index}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="rounded-lg flex justify-center items-center p-4 h-full bg-transparent">
            <Image
              src={item.image}
              alt={`Carousel Item ${index + 1}`}
              height={item.height}
              className="object-contain"
            />
          </div>
        </a>
      ))}
    </MultiCarousel>
  );
};

export default MultiItemCarousel;
