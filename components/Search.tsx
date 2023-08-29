import React, { useState } from "react";
import { ethers } from "ethers";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  resolvedName: string | null | undefined;
  resolvedImage: string | null | undefined;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  resolvedName,
  resolvedImage,
}) => {
  if (!isOpen) {
    return null;
  }
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-md shadow-md">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          Close
        </button>
        <div className="flex mb-2 items-center justify-center">
          {resolvedName && (
            <p className="text-gray-900 font-semibold m-3">
              ENS Name: {resolvedName}
            </p>
          )}
          {resolvedImage && (
            <img
              src={resolvedImage}
              alt="Avatar"
              className="w-10 rounded-full "
            />
          )}
        </div>
      </div>
    </div>
  );
};

const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/5cf626a98b0349f789b16075424370e7"
);

export const useENS = () => {
  const [names, setNames] = useState<string | null>();
  const [image, setImage] = useState<string | null | undefined>();

  const resolveENS = async (addr: string) => {
    try {
      const resolvedName = await provider.lookupAddress(addr);
      setNames(resolvedName);
      const resolvedImage = await provider.getAvatar(addr);
      setImage(resolvedImage);
    } catch (error) {
      console.error("Error resolving ENS:", error);
    }
  };

  return {
    names,
    image,
    resolveENS,
  };
};

function Search() {
  const { names, image, resolveENS } = useENS();
  const [inputValue, setInputValue] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    resolveENS(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="ENS Search"
        className="z-80 px-4 py-1.5 mb-0.5 mx-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 sm:w-auto text-black"
        value={inputValue}
        onChange={handleInputChange}
      />
      {/* {names && <p>Resolved ENS Name: {names}</p>}
      {image && <img src={image} alt="Avatar" />} */}

      <Popup
        isOpen={names ? true : false}
        onClose={closePopup}
        resolvedName={names}
        resolvedImage={image}
      />
    </div>
  );
}

export default Search;
