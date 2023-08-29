import React from "react";
// import { useENS } from "./useENS"; // Import the useENS hook you created
import closeIcon from "./close-icon.png"; // Import your close icon image
import { useENS } from "./Search";


interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, address }) => {
  const { names, image, resolveENS } = useENS();

  React.useEffect(() => {
    if (isOpen) {
      resolveENS(address);
    }
  }, [isOpen, address, resolveENS]);

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 z-50 overflow-y-auto`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring"
            >
              <img src={closeIcon} alt="Close" />
            </button>
          </div>
          <div className="text-center">
            {image && <img src={image} alt="Avatar" className="mx-auto h-16 w-16 rounded-full" />}
            <h3
              className="mt-2 text-lg font-medium text-gray-900"
              id="modal-headline"
            >
              Resolved ENS Name: {names}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Address: {address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
