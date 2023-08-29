import { CoreContractAddress, CoreContractAbi, CoreContractAddress_avx, PitchTubeAddress_avx } from "../constants/index";
import {
  useAccount,
  useContract,
  useProvider,
  useSigner,
  useBalance,
  useNetwork
} from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import { Player, useAssetMetrics } from "@livepeer/react";

import { useRouter } from "next/router";

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

function getKeys() {
  return process.env.NEXT_PUBLIC_STUDIO_API_KEY;
}

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: getKeys() as string,
  }),
});
import { PitchTubeAbi, PitchTubeAddress } from "../constants";
import Head from "next/head";

export default function PostStartup() {
  return (
    <div className="w-full">
      <LivepeerConfig client={livepeerClient}>
        <PostStartupExport />
      </LivepeerConfig>
    </div>
  );
}

interface IStartups {
  name: string;
  tag: string;
  desc: string;
  amt: string;
  // img : string;
  // video : string;
}
interface IvidImg{
  img : string;
  vid : string;
}

function PostStartupExport() {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork();


  const core = useContract({
    address: chain && chain.id === 421613 ? CoreContractAddress : CoreContractAddress_avx,
    abi: CoreContractAbi,
    signerOrProvider: signer || provider,
  });
  

  const sbt = useContract({
    address: chain && chain.id === 421613 ? PitchTubeAddress : PitchTubeAddress_avx,
    abi: PitchTubeAbi,
    signerOrProvider: signer || provider,
  });

  const [myStartup, setMyStartup] = useState<IStartups>({
    name: "Name Of StartUp",
    tag: "TagLine Of StartUp",
    desc: " Full Description Of StartUp",
    amt: "Amount Needed",
    // img : "startUp.jpg",
    // video : "b66bkq9unt44br5k"
  });

  const img = useRef("startUp.jpg");
  const video = useRef("aaf8n564dj8nwh19");

  const [ imgVid , setImgVid] = useState<IvidImg>({
    img : "img/startUp.jpg",
    vid : "aaf8n564dj8nwh19"
  })

  async function getImgVideo() {
    try {
      const imgTx = await core?.getImageLink(address);
      console.log(imgTx);
      // imgTx === "startUp"
      //   ? img.current = "startUp.jpg"
      //   : img.current = `https://ipfs.io/ipfs/${imgTx}`;
      
      const vidTx = await core?.getVideoHash(address)
      console.log(vidTx);
      // video.current = (vidTx && vidTx !== "NOT_UPLOADED_YET") ? vidTx : "aaf8n564dj8nwh19"

      setImgVid({
        img : imgTx === "startUp" ? "img/startUp.jpg" : `https://ipfs.io/ipfs/${imgTx}`,
        vid : vidTx === "NOT_UPLOADED_YET" ? "aaf8n564dj8nwh19" : vidTx
      })

    } catch (err) {
      toast("Recommended to upload a Video ;)" )
      console.log("Recommended to upload a Video ;)");
    }
  }

  const getDataTx = async () => {
    try {
      
      const checkS = await sbt?.isStartup(address);
      const checkI = await sbt?.isInvestor(address);
      console.log(checkS);
      if (!(checkS || checkI)){
        toast("Buy NFT First")
        return;
      }

      

      const tx = await core?.getOwnerStartups();
      console.log(tx);

      setMyStartup({
        name: tx.name,
        tag: tx.tagline,
        desc: tx.description,
        amt: tx.amount.toString(),
        // img : imgTx,
        // video : vidTx ? vidTx : "b66bkq9unt44br5k"
      });

      console.log(tx);
      getImgVideo();
    } catch (err) {
      console.log("Post about your Startup first ;)");
      toast("Post about your Startup first ;)");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="bg-blue-500 w-full min-h-screen overflow-x-hidden flex  flex-col bg-[url('https://awesomescreenshot.s3.amazonaws.com/image/3743367/40400571-0b9d940d93924b22e8cb868e57b17196.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20230602%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230602T081536Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=e4d5ac39743377e227184cf3a4bc9fa1c5c26aaec0a4d946a2a43af4ec636e91')]  bg-cover bg-no-repeat items-start gap-8 pt-20 justify-start  ">
      <Head>
        <title>Post Startups</title>
         <meta name="description" content="Created with <3 by Wisdom" />
          <link rel="icon" href="/hatch.png" />
      </Head>
      <ToastContainer />
      <div className="flex justify-content-center flex-wrap gap-2 ml-16">
        <Link
          href={{
            pathname: "/EditPost",
            query: { name: "POST_NEW" },
          }}
          // onClick={handleActive}
          className="rounded-3xl   bg-[#fff]  hover:shadow-xl  hover:scale-110 hover:shadow-yellow-600 transition-all duration-200 ease-linear flex items-center justify-center py-1.5 px-3  "
        >
          <img src="img/plus.png" alt="img" className="sm:w-12 w-8 mr-2" />{" "}
          <span>Post your Startup</span>
        </Link>

        <button
          className="rounded-3xl   bg-[#fff]  hover:shadow-xl  hover:scale-110 hover:shadow-yellow-600 transition-all duration-200 ease-linear flex items-center justify-center py-0.5 px-2 ml-4 "
          onClick={getDataTx}
        >
          <img src="img/refresh.png" alt="img" className="sm:w-8 w-6 mr-2" />{" "}
          <span className="text-sm">Refresh</span>
        </button>
      </div>

      {/* {isMystartup ? ( */}
      <div className="w-full flex items-center justify-center">
        <div className="sm:w-2/4 w-4/5  h-5/6 bg-white/10  transition-all duration-300 ease-linear  backdrop-blur-md flex flex-col items-start justify-center rounded-xl font-jose relative  ">
          <img
            src={imgVid.img}
            alt="header"
            className="h-60 w-full rounded-t-xl "
          />
          <Link
            href={{
              pathname: "/EditPost",
              query: { name: "IMAGE" },
            }}
          >
            <img
              src={`img/pencil.png`}
              alt="header"
              className=" absolute right-2 top-2 w-8 cursor-pointer"
              // onClick={() => alert("i am touched")}
            />
          </Link>

          <div className=" w-9/12 flex items-center mt-4 ml-4 text-white">
            <span className="text-2xl font-semibold">{myStartup.name}</span>
            <Link
              href={{
                pathname: "/EditPost",
                query: { name: "NAME" },
              }}
            >
              <img
                src={`img/pencil.png`}
                alt="header"
                className="ml-8 w-4 cursor-pointer"
                
              />
            </Link>
          </div>

          <div className="flex items-center justify-between gap-8 ">
            <span className="text-base mt-3 ml-4 text-white  ">
              Seeking - <b className="font-bold text-xl">${myStartup.amt}</b>
            </span>
            <Link
              href={{
                pathname: "/EditPost",
                query: { name: "AMOUNT" },
              }}
            >
              <img
                src={`img/pencil.png`}
                alt="header"
                className="w-4 cursor-pointer"
                // onClick={() => alert("i am touched")}
              />
            </Link>
          </div>

          <div className="flex items-start flex-col flex-wrap justify-start  text-white ">
            <span className="mt-3 ml-4 flex items-center  font-semibold justify-start text-base tracking-widest w-1/2  ">
              Tagline
              <Link
                href={{
                  pathname: "/EditPost",
                  query: { name: "TAGLINE" },
                }}
              >
                <img
                  src={`img/pencil.png`}
                  alt="header"
                  className="w-4 cursor-pointer"
                  // onClick={() => alert("i am touched")}
                />
              </Link>
            </span>
            <p className=" mt-3 mx-4 text-zinc-300 flex-wrap">
              {myStartup.tag}
            </p>
          </div>
          <div className="flex items-start flex-col flex-wrap justify-start  text-white ">
            <span className="mt-3 ml-4 flex font-semibold items-center justify-start text-base tracking-widest w-1/2  ">
              Description
              <Link
                href={{
                  pathname: "/EditPost",
                  query: { name: "DESCRIPTION" },
                }}
              >
                <img
                  src={`img/pencil.png`}
                  alt="header"
                  className="w-4 cursor-pointer"
                  // onClick={() => alert("i am touched")}
                />
              </Link>
            </span>
            <p className=" mt-3 mx-4 flex-wrap text-zinc-300">
              {myStartup.desc}
            </p>
          </div>
          <div className="flex items-start flex-col flex-wrap justify-center  text-white w-full  ">
            <span className="mt-3 ml-4 flex font-semibold items-center justify-start text-base tracking-widest w-1/2  ">
              Upload a Video ?
              <Link
                href={{
                  pathname: "/EditPost",
                  query: { name: "VIDEO" },
                }}
              >
                <img
                  src={`img/pencil.png`}
                  alt="header"
                  className="w-4 ml-4 cursor-pointer"
                  // onClick={() => alert("i am touched")}
                />
              </Link>
            </span>
            <div className="w-full my-4 flex items-center justify-center">
              
              <Player
                title={"Video"}
                playbackId={imgVid.vid}
                
                autoPlay
                muted
                autoUrlUpload={{
                  fallback: true,
                  ipfsGateway: "https://w3s.link",
                }}
              />
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}
