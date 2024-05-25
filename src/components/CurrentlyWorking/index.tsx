import Image from "next/image";
import construction from "../../../public/construction.svg";

const CurrentlyWorking = () => (
  <div className='flex flex-col justify-center align-middle'>
    <Image src={construction} className='self-center' width={400} alt="Under Construction" />
    <p className=" text-base text-gray-700 text-center">
      We currently working on this page. Please check back later!
    </p>
  </div>
);

export default CurrentlyWorking;
