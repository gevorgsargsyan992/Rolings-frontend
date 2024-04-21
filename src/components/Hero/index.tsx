import Image from "next/image";
import Button from "../Button";
import testImage from "@/assets/images/testt-image.png";

const Hero = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full">
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex justify-end">
            <Button>Lorem</Button>
            <Button>Lorem ipsum</Button>
          </div>
          <div className="flex flex-col text-right">
            <p>Lorem ipsum dolor</p>
            <p>consect tur</p>
          </div>
          <p>advatanges of our work</p>
        </div>
        <div className="flex flex-1">
          <Image
        //   className="w-full"
            objectFit="contain"
            height={200}
            src={testImage}
            alt="test image"
          />
        </div>
      </div>
      <div className="flex w-full">
        <Button>aaa</Button>
        <Button>aaa</Button>
        <Button>aaa</Button>
      </div>
      <div className="flex w-full">
        <Button>bbb</Button>
        <Button>bbbb</Button>
        <Button>bbbb</Button>
      </div>
    </div>
  );
};

export default Hero;
