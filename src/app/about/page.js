import Navbar from "@/components/Navbar";
import Image from "next/image";


export default function () {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-5xl font-bold my-5">About SycoFusion</h1>
      <Image src={"/logo.png"} width={300} height={300}/>
      </div>
  )
}