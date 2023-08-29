import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Search from "./Search";


export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav className="z-50 fonty w-full bg-[#100a25] p-0 text-white font-body text-xl flex items-start justify-between transition-all duration-300 ease-linear fixed top-0">

  <div className="z-80 sm:w-72 cursor-pointer flex items-center mt-3 px-3 justify-center rounded-md">
    <Link href="/">
      <span className="font-heading text-3xl">PitchTube</span>
    </Link> 
  </div>

  <div className={`py-2 flex items-end justify-end sm:justify-between md:w-full flex-col sm:flex-row`}>

    <div
      className="z-80 px-6 flex items-center justify-center cursor-pointer transition-all duration-300 ease-linear p-1 rounded-full sm:hidden"
      onClick={() => setIsActive((prev) => !prev)}
    >
      {!isActive ? (
        <img src="/img/menu.png" alt="menu" width={38} className="duration-100 transition-all ease-linear" />
      ) : (
        <img src="/img/close.png" alt="menu" width={38} className="z-80 hover:rotate-90 duration-100 transition-all ease-linear" />
      )}
    </div>

    <div className={`${isActive ? "flex flex-col gap-2 items-center justify-center" : "hidden sm:flex sm:items-center sm:justify-end sm:mr-auto gap-2 mx-auto text-base"}`}>

      <Link href="/Assets">
        <p className="z-80 cursor-pointer hover:bg-[#ff9e00] hover:text-black transition-all duration-200 ease-linear bg-transparent py-1 px-4 rounded-md text-center text-base md:text-lg">
          Assets
        </p>
      </Link>
      <Link href="/AllStartups">
        <p className="z-80 cursor-pointer hover:bg-[#ff9e00] hover:text-black transition-all duration-200 ease-linear bg-transparent py-1 px-4 rounded-md text-center text-base md:text-lg">
          All Startups
        </p>
      </Link>
      <Link href="/PostStartup">
        <p className="z-80 cursor-pointer hover:bg-[#ff9e00] hover:text-black transition-all duration-200 ease-linear bg-transparent py-1 px-4 rounded-md text-center text-base md:text-lg">
          Post & Edit
        </p>
      </Link>
      
     <Search/>

    </div>

    <div className={` ${isActive ? "flex flex-col gap-2 my-4 ":" hidden sm:flex sm:items-center sm:justify-center  gap-2 my-auto md:pr-4 pr-6"}`}>

      {/* <Link href={"/BuyNFT"}>
        <p className="z-80 cursor-pointer bg-[#ff9e00] hover:bg-[#ffad15] text-black transition-all duration-200 ease-linear py-1 px-4 rounded-md text-center">
          Buy NFT
        </p>
      </Link> */}
      
      <ConnectButton chainStatus="icon" accountStatus="avatar"/>
    </div>  
    
  </div>

</nav>

  );
}
