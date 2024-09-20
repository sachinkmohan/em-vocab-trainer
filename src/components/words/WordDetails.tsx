import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef } from "react";

interface WordDetailsProps {
  selectedTranslation: string;
  closeDialog: () => void;
}
const WordDetails = forwardRef<HTMLDialogElement, WordDetailsProps>(
  ({ selectedTranslation, closeDialog }, ref) => {
    return (
      <dialog
        ref={ref}
        className="relative bg-gray-50 p-4 rounded-lg shadow-xl border border-gray-200 w-[375px] h-[150px]"
      >
        <h2 className="text-xl text-center">Word Meaning</h2>
        <p className="text-lg text-center font-bold mt-4 p-4 rounded-lg shadow-md bg-gradient-to-r from-yellow-200 to-green-200 tracking-wide leading-relaxed ring-2 ring-blue-300">
          {selectedTranslation}
        </p>
        <FontAwesomeIcon
          className="absolute top-2 right-2 text-rose-300 text-2xl"
          icon={faCircleXmark}
          onClick={closeDialog}
        />
      </dialog>
    );
  }
);

export default WordDetails;
