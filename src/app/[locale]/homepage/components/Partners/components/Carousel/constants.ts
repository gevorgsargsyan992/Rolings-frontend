import loyal from "../../../../../../../../public/loyal.webp";
import ameria from "../../../../../../../../public/ameria.webp";
import exterior from "../../../../../../../../public/exterior.webp";
import autolab from "../../../../../../../../public/autolab.webp";
import skill from "../../../../../../../../public/skill.webp";
import blaze from "../../../../../../../../public/blaze.webp";
import publicis from "../../../../../../../../public/publicis.webp";

export const DATA = [
  { image: ameria, url: "https://ameriabank.am/", height: 36 },
  { image: autolab, url: "https://www.autolab.am/", height: 14 },
  { image: exterior, url: "https://exterior.am/", height: 40 },
  { image: loyal, url: "https://loyal.am/hy", height: 60 },
  { image: blaze, url: "", height: 60 },
  { image: publicis, url: "https://publicis.am/", height: 60 },
  { image: skill, url: "https://skill.am/", height: 50 },
];

export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
