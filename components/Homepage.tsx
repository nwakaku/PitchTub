import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SSX } from "@spruceid/ssx";
import { useRouter } from "next/router";

export default dynamic(() => Promise.resolve(Homepage), { ssr: false });

const Homepage = () => {
  function handleContact(e: string) {
    window.open(e);
  }
  const ssx = new SSX();
  const [address, setAddress] = useState<string | undefined>("");
  const router = useRouter(); // Initialize the router

  const signInButtonHandler = async () => {
    try {
      const session = await ssx.signIn();
      setAddress(session.address);
      console.log(session);

      // Check if the session.address is valid (add your validation logic here)
      if (session.address) {
        router.push("/BuyNFT"); // Navigate to the /BuyNFT page
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // useEffect(() => {
  //   const getAddress = async () => {
  //     try {
  //       ssx.session();
  //     } catch (error) {
  //       console.error("Error fetching address:", error);
  //     }
  //   };

  //   getAddress();
  // }, []);

  return (
    <>
      <section className="bg-white fonty">
        {/* mark this */}

        {/* mark this */}
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-6">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-blue-800">
              Empowering Startups <br /> with Opportunities
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-600 lg:mb-8 md:text-lg lg:text-xl">
              PitchTube is an NFT-gated startup incubator platform that enables
              startups to raise funding through video pitches while providing
              networking and mentorship opportunities
            </p>
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <button
                onClick={signInButtonHandler}
                className="text-white bg-[#ff9e00] hover:bg-[#ffad15] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0"
              >
                {address ? address : "Launch App"}
              </button>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-6 lg:flex">
            <img
              src="https://astrolus-premium.netlify.app/images/hero-dark.webp"
              alt="hero image"
            />
          </div>
        </div>
      </section>

      {/* /* ssection two */}
      <section className=" w-full flex flex-col items-center justify-start bg-[#100a25] dark:bg-[#100a25]">
        <span className="text-white p-3 fonty">TECH STACK</span>

        <div className="grid sm:grid-cols-6 grid-cols-3 auto-cols-max items-center  ">
          <img
            src="https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=026"
            alt="img"
            className=" sm:p-12 p-6"
          />
          <img src="/img/huddle.png" alt="img" className=" sm:p-12 p-6" />
          <img
            src="https://blog.spruceid.com/content/images/2021/09/Group-250.png"
            alt="img"
            className=" sm:p-12 p-6"
          />
          <img
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1651122498709/FQjch0sgd.png"
            alt="img"
            className=" sm:p-12 p-6"
          />
          <img
            src="https://d4.alternativeto.net/uaUADPLN5QTqRHNl0qujQbTXzm5wjsAq5K9Y-ylGjdQ/rs:fill:280:280:0/g:ce:0:0/YWJzOi8vZGlzdC9pY29ucy90YWlsd2luZC1jc3NfMTM2NjE5LnBuZw.png"
            alt="img"
            className=" sm:p-12 p-6"
          />
          <img src="/img/avalanche.png" alt="img" className=" sm:p-12 p-6" />
        </div>

        {/* <some> </some> */}
      </section>
      {/* <section className="bg-gray-50 dark:bg-white"> */}
      <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
        {/* <!-- Row --> */}
        <section className="bg-gray-50 dark:bg-white items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
          <div className="text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray">
              Problems We Solve
            </h2>

            {/* <!-- List --> */}
            <ul
              role="list"
              className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700"
            >
              <li className="flex space-x-3">
                {/* <!-- Icon --> */}
                <svg
                  className="flex-shrink-0 w-5 h-5 text-yellow-400 dark:text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-base font-medium leading-tight text-gray-900 dark:text-gray-500">
                  StartUps Looking for funding
                </span>
              </li>
              <li className="flex space-x-3">
                {/* <!-- Icon --> */}
                <svg
                  className="flex-shrink-0 w-5 h-5 text-yellow-400 dark:text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-base font-medium leading-tight text-gray-900 dark:text-gray-500">
                  Investor Looking for an Opportunity to Invest.
                </span>
              </li>
              <li className="flex space-x-3">
                {/* <!-- Icon --> */}
                <svg
                  className="flex-shrink-0 w-5 h-5 text-yellow-400 dark:text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-base font-medium leading-tight text-gray-900 dark:text-gray-500">
                  Connecting StartUps with Investors
                </span>
              </li>
            </ul>
            <p className="mb-8 font-light lg:text-xl">
              Empowering Startups with the Opportunity for Video Pitches and
              Access to Funding.
            </p>
          </div>
          <img
            className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex"
            src="https://ampire.netlify.app/images/stats-login.webp"
            alt="dashboard feature image"
          />
        </section>
        {/* <!-- Row --> */}
      </div>
      {/* </section> */}

      <div className="fonty  dark:bg-[#100a25] text-white">
        <div className="mx-auto w-full flex flex-col items-center justify-center  ">
          <p className="sm:text-6xl text-3xl  text-center my-4 mb-8  font-jose mt-12 ">
            So what you are waiting for ?
          </p>
          <p className="sm:text-5xl text-2xl text-center my-4 mb-8  font-vt mt-12 ">
            If you want FREE Access ??
          </p>
          <p className="sm:text-2xl text-xl text-center my-4 mb-8  font-jose w-9/12 mx-auto ">
            Jump right In and buy an NFT to Enjoy 😊️
          </p>

          <Link
            href={"/BuyNFT"}
            className="mx-auto z-10 font-vt text-6xl bg-blue-500 text-[#ffffff] rounded-3xl shadow-blue-100 shadow-xl py-2 px-8 hover:scale-110 transition-all duration-200 ease-linear"
          >
            Buy Now
          </Link>
        </div>
        <img src="img/arr2.png" alt="img" width={250} className="ml-48" />{" "}
      </div>
      <footer className="fonty">
        <div className="bg-[#100a25] text-white grid grid-cols-2 w-full">
          <div className="flex flex-col items-start p-4 justify-start">
            <p className="text-xl">PitchTube</p>
            <p className="text-sm">
              A One stop shop for STARTUPS and INVESTORS
            </p>
            <div className="flex   gap-8 mt-2">
              <div>
                <img
                  className="cursor-pointer"
                  src="/img/twitter.png"
                  alt="bg"
                  width={40}
                />
              </div>
              <div>
                <img
                  className="cursor-pointer"
                  src="/img/github.png"
                  alt="bg"
                  width={40}
                />
              </div>
              <div>
                <img
                  className="cursor-pointer"
                  src="/img/linkin.png"
                  alt="bg"
                  height={40}
                  width={40}
                />
              </div>
            </div>
          </div>
          <span className=" py-2 my-auto  text-[#c7c7c7] text-xs">
            ©2023 PitchTube. ALL COPYRIGHTS RESERVED
          </span>
        </div>
      </footer>
    </>
  );
};
