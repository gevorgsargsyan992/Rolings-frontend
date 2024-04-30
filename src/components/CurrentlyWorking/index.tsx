import Image from "next/image";
import logo from "../../../public/logo.webp";
import construction from "../../../public/construction.svg";

const CurrentlyWorking = () => (
  <div className='flex flex-col justify-center align-middle'>
    <Image src={logo} width={200} className='self-center' alt="Under Construction" />
    <Image src={construction} className='self-center' width={500} alt="Under Construction" />
    <p className=" text-xl text-gray-700 text-center">
      We currently working on this page. Please check back later!
    </p>
  </div>
);

export default CurrentlyWorking;
