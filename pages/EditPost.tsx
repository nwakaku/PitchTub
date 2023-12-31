import {
  CoreContractAddress,
  CoreContractAbi,
  PitchTubeAddress,
  PitchTubeAbi,
  PitchTubeAddress_avx,
  CoreContractAddress_avx,
} from "../constants";
import {
  useAccount,
  useContract,
  useProvider,
  useSigner,
  useNetwork,
  useBalance,
} from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

import lighthouse from "@lighthouse-web3/sdk";

import { Player, useAssetMetrics, useCreateAsset } from "@livepeer/react";

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

// import { StoreData } from "../components/Store";
import { Web3Storage } from "web3.storage";


interface NewPost {
  name: string;
  tagline: string;
  amount: number | undefined;
  descrip: string;
}

function getKeys() {
  return process.env.NEXT_PUBLIC_STUDIO_API_KEY;
}

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: getKeys() as string,
  }),
});

export default function EditPost() {
  return (
    <LivepeerConfig client={livepeerClient}>
      <EditPostExport />
    </LivepeerConfig>
  );
}

function EditPostExport() {
  const [name, setName] = useState<string>("");
  const [tagline, setTagline] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  const [descrip, setDescrip] = useState<string>("");
  const [img, setImg] = useState();
  const { chain, chains } = useNetwork();


  const [post, setPost] = useState<NewPost>({
    name: "",
    tagline: "",
    amount: undefined,
    descrip: "",
  });

  function handlePost(e: any) {
    setPost((prev) => {
      return {
        ...prev,
        [e.target?.name]: e.target?.value,
      };
    });
  }
  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  function handleTag(e: React.ChangeEvent<HTMLInputElement>) {
    setTagline(e.target.value);
  }
  function handleAmt(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(+e.target.value);
  }
  function handleDesc(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescrip(e.target.value);
  }

  const router = useRouter();
  const activateEdit = router.query.name;
  console.log(activateEdit);

  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

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

  // async function bbb() {
  //   try {
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // console.log(process.env.NEXT_PUBLIC_LIGHTHOUSE);
  async function editNameTx(val: string) {
    try {
      if (!val) return;
      const tx = await core?.editName(val);
      toast("Waiting for Confirmation");
      await tx?.wait();
      toast.success("Name edited successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error while editing name");
    }
  }
  async function editTagTx(val: string) {
    try {
      if (!val) return;
      const tx = await core?.editTagline(val);
      toast("Waiting for Confirmation");
      await tx?.wait();
      toast.success("Tagline edited successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error while editing tagline");
    }
  }
  async function editDescripTx(val: string) {
    try {
      if (!val) return;
      const tx = await core?.editDescription(val);
      toast("Waiting for Confirmation");
      await tx?.wait();
      toast.success("Description edited successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error while editing description");
    }
  }
  async function editAmountTx(val: number | undefined) {
    try {
      if (!val) return;
      console.log(val);
      const tx = await core?.editAmount(val);
      toast("Waiting for Confirmation");
      await tx?.wait();
      toast.success("Amount edited successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error while editing amount");
    }
  }

  async function submitPost(val: NewPost) {
    try {
      const checkS = await sbt?.isStartup(address);
      const checkI = await sbt?.isInvestor(address);
      console.log(checkS);
      if (!(checkS || checkI)) {
        toast.warn("BUY NFT FIRST ");
        return;
      }

      if (!(val.amount && val.descrip && val.name && val.tagline)) return;
      console.log(val);
      //  console.log(+val.amount);

      const tx = await core?.addStartupsToList(
        val.name,
        val.descrip,
        val.tagline,
        val.amount
      );
      toast("Waiting for Confirmation");
      await tx?.wait();
      toast.success("Startup posted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error while Posting");
    }
  }

  //---------------------------------------------------------------------------------
  // LIGHTHOUSE IMPLEMENTATION

  function handleImage(e: any) {
    setImg(e);
  }

  const progressCallback = (progressData: any) => {
    let percentageDone: any = (
      progressData.total / progressData.uploaded
    )?.toFixed(2);
    let percentage: any = 100 - percentageDone;
    console.log(percentage);
  };

  async function changeImg(val: any) {
    try {
      // const key = process.env.NEXT_PUBLIC_LIGHTHOUSE;
      // if (!key) return;
      if (!val) return;
      console.log(val);
      const client = new Web3Storage({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdBNjFGOTQ4RkExNWM4QUZCMzU3ZDdlNGQzMjJEMjQ0MzMzZTQ0MUQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODkyNTI4NTY1NTIsIm5hbWUiOiJhaSJ9.St6xCU6PbIKARwEBzXPYvn8pqieiQoTmee5ogLEAv8I",
      });
      const cid = await client.put([val]);
  
      // StoreData(val);

      // const output = await lighthouse.upload(val, key, progressCallback);
      // console.log("File Status:", output);
      // toast.success("Image Uploaded to IPFS");
      console.log(cid);
      // const hash = StoreData(val);
      const tx = await core?.editImgLink(cid);
      toast("Uploading to Blockchain");
      await tx?.wait();
      toast.success("Image edited successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error while editing image");
    }
  }

  // ---------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------
  // Livepeer Integration

  const [video, setVideo] = useState<any>();

  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error,
  } = useCreateAsset(
    video && { sources: [{ name: video?.name, file: video }] }
  );

  const isLoading = useMemo(
    () =>
      status === "loading" ||
      (asset?.[0] && asset[0].status?.phase !== "ready"),
    [status, asset]
  );

  useMemo(
    () =>
      progress?.[0].phase === "failed"
        ? toast.error("Error while uploading")
        : progress?.[0].phase === "waiting"
        ? "Waiting..."
        : progress?.[0].phase === "uploading"
        ? (() => toast("Uploading "))()
        : progress?.[0].phase === "processing"
        ? (() =>
            toast.success("Processing , Approve transaction to Complete"))()
        : null,
    [progress]
  );

  useMemo(() => {
    if (asset?.[0]?.playbackId) {
      (() => uploadVideoHash(asset?.[0]?.playbackId))();
      return asset[0].playbackId;
    }
  }, [asset]);

  // console.log(assetObj);

  async function uploadVideoHash(val: string) {
    try {
      if (!val) return;
      console.log("yeyeyeyeeye   ", val);
      const tx = await core?.addVideoHash(val);
      toast("Upoaidng to Blockchain");
      await tx?.wait();
      toast.success("Video edited successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error while editing video");
    }
  }

  // ---------------------------------------------------------------------------------

  return (
    <div className="bg-blue-500 flex items-center justify-center flex-col min-h-screen w-full font-jose bg-[url('https://awesomescreenshot.s3.amazonaws.com/image/3743367/40400571-0b9d940d93924b22e8cb868e57b17196.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20230602%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230602T081536Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=e4d5ac39743377e227184cf3a4bc9fa1c5c26aaec0a4d946a2a43af4ec636e91')]  bg-cover bg-no-repeat sm:pt-20 py-20 sm:pb-44  relative">
      <Head>
        <title> Post & Edit Startup</title>
      </Head>
      <ToastContainer />
      <div className="flex flex-col text-white sm:w-6/12 w-11/12 z-30  bg-white/10 backdrop-blur-lg rounded-2xl items-start justify-start gap-2 my-auto  ">
        <div className="flex items-center justify-start  w-full z-30 ">
          {activateEdit && activateEdit !== "POST_NEW" ? (
            <span className=" z-30 text-2xl w-5/6 text-start sm:text-3xl mx-8 mt-4  ">
              <b className="text-base">Edit - </b> {activateEdit}
            </span>
          ) : (
            <span className=" z-30 text-2xl w-5/6 text-start sm:text-3xl mx-8 mt-4  ">
              <b className="text-base">Create Post - </b> New Startup
            </span>
          )}

          <span className="cursor-pointer mt-4 px-8 ">
            <Link href="/PostStartup">
              <img
                src={`img/back.png`}
                alt="header"
                className="w-6 ml-4 cursor-pointer"
              />
            </Link>
          </span>
        </div>

        <div
          className={`z-30 flex w-full flex-col items-start  justify-center sm:text-xl text-sm`}
        >
          <span className="text-sm mx-8 mb-3 text-gray-400 z-30 ">
            {activateEdit === "POST_NEW"
              ? "Let's share some details about your Startup"
              : "Mutate your Startup details"}
          </span>
          {(activateEdit === "NAME" || activateEdit === "POST_NEW") && (
            <>
              <div className=" z-30 py-3 flex flex-col flex-wrap items-start  gap-2 w-full px-8 ">
                <input
                  name="name"
                  type="text"
                  onChange={
                    activateEdit === "POST_NEW" ? handlePost : handleName
                  }
                  className="text-black text-start text-sm border w-full border-zinc-300 px-8  rounded-sm h-8 "
                  placeholder="Name Of Startup"
                />

                {activateEdit !== "POST_NEW" && (
                  <button
                    onClick={() => editNameTx(name)}
                    className="bg-[#ff9e00] text-white py-1 px-4 w-1/4 mx-auto my-3 hover:scale-110 hover:shadow-xl hover:shadow-yellow-800 rounded-xl transition-all duration-150 ease-linear"
                  >
                    Save
                  </button>
                )}
              </div>
            </>
          )}

          {(activateEdit === "TAGLINE" || activateEdit === "POST_NEW") && (
            <>
              <div className=" z-30 py-3 flex flex-col flex-wrap items-start  gap-2 w-full px-8 ">
                <input
                  name="tagline"
                  type="text"
                  onChange={
                    activateEdit === "POST_NEW" ? handlePost : handleTag
                  }
                  className="text-black text-start text-sm border w-full border-zinc-300 px-8  rounded-sm h-8 "
                  placeholder="Tagline Of Startup"
                />
                {activateEdit !== "POST_NEW" && (
                  <button
                    onClick={() => editTagTx(tagline)}
                    className="bg-[#ff9e00] text-white py-1 px-4 w-1/4 mx-auto my-3 hover:scale-110 hover:shadow-xl hover:shadow-yellow-800 rounded-xl transition-all duration-150 ease-linear"
                  >
                    Save
                  </button>
                )}
              </div>
            </>
          )}

          {(activateEdit === "AMOUNT" || activateEdit === "POST_NEW") && (
            <>
              <div className=" z-30 py-3 flex flex-col flex-wrap items-start  gap-2 w-full px-8 ">
                <input
                  name="amount"
                  type="number"
                  min={0}
                  onChange={
                    activateEdit === "POST_NEW" ? handlePost : handleAmt
                  }
                  className="text-black text-start text-sm border w-full border-zinc-300 px-8  rounded-sm h-8 "
                  placeholder="Amount you are seeking to raise - $80,000"
                />
                {activateEdit !== "POST_NEW" && (
                  <button
                    onClick={() => editAmountTx(amount)}
                    className="bg-[#ff9e00] text-white py-1 px-4 w-1/4 mx-auto my-3 hover:scale-110 hover:shadow-xl hover:shadow-yellow-800 rounded-xl transition-all duration-150 ease-linear"
                  >
                    Save
                  </button>
                )}
              </div>
            </>
          )}

          {(activateEdit === "DESCRIPTION" || activateEdit === "POST_NEW") && (
            <>
              <div className=" z-30 py-3 flex flex-col flex-wrap items-start  gap-2 w-full px-8 ">
                <textarea
                  name="descrip"
                  onChange={
                    activateEdit === "POST_NEW" ? handlePost : handleDesc
                  }
                  className="text-black text-start text-sm border resize-none h-80 py-4 w-full border-zinc-300 px-8  rounded-sm  "
                  placeholder="A Detailed Description about Startup and its vision and mission."
                />
                {activateEdit !== "POST_NEW" && (
                  <button
                    onClick={() => editDescripTx(descrip)}
                    className="bg-[#ff9e00] text-white py-1 px-4 w-1/4 mx-auto my-3 hover:scale-110 hover:shadow-xl hover:shadow-yellow-800 rounded-xl transition-all duration-150 ease-linear"
                  >
                    Save
                  </button>
                )}
              </div>
            </>
          )}
          {activateEdit === "IMAGE" && (
            <>
              <div className=" z-30 py-3 flex flex-col flex-wrap items-start  gap-2 w-full px-8 ">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Upload Image
                </label>
                <input
                  accept="image/*"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  onChange={handleImage}
                />

                <button
                  onClick={() => changeImg(img)}
                  className="bg-[#ff9e00] text-white py-1 px-4 w-1/4 mx-auto my-3 hover:scale-110 hover:shadow-xl hover:shadow-yellow-800 rounded-xl transition-all duration-150 ease-linear"
                >
                  Save
                </button>
              </div>
            </>
          )}
          {activateEdit === "VIDEO" && (
            <>
              <div className=" z-30 py-3 flex flex-col flex-wrap items-start  gap-2 w-full px-8 ">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Upload Video
                </label>
                <input
                  accept="video/*"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  onChange={(e: any) => setVideo(e.target.files?.[0])}
                />

                <button
                  disabled={isLoading || !createAsset}
                  onClick={() => createAsset?.()}
                  className="bg-[#ff9e00] text-white py-1 px-4 w-1/4 mx-auto my-3 hover:scale-110 hover:shadow-xl hover:shadow-yellow-800 rounded-xl transition-all duration-150 ease-linear"
                >
                  Save
                </button>
              </div>
            </>
          )}

          {activateEdit === "POST_NEW" && (
            <button
              onClick={() => submitPost(post)}
              className="bg-[#ff9e00] text-white py-1 px-4 w-1/4 mx-auto my-3 hover:scale-110 hover:shadow-xl hover:shadow-yellow-800 rounded-xl transition-all duration-150 ease-linear"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
