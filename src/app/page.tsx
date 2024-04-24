'use client'
import Image from 'next/image';
import construction from '../../public/construction.svg'
import logo from '../../public/logo.svg'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <Image src={logo} width={200} alt="Under Construction"></Image>
      <Image src={construction} width={500} alt="Under Construction" />
      <p className=" text-xl text-gray-700 text-center">
        We currently working on this page. Please check back later!
      </p>
    </div>
  );
}
