import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef } from "react";

interface Word {
  id: string;
  word: {
    inTranslit: string;
    inNativeScript: string;
  };
  meaning: string;
  figureOfSpeech: string;
  examples: {
    inTranslit: string;
    translation: string;
    inNativeScript: string;
  }[];
  wordLevel: string;
  pronunciation: string;
}

interface WordDetailsProps {
  selectedTranslation: Word;
  closeDialog: () => void;
}
const WordDetails = forwardRef<HTMLDialogElement, WordDetailsProps>(
  ({ selectedTranslation, closeDialog }, ref) => {
    return (
      <dialog
        ref={ref}
        className="fixed max-w-md h-1/3 bg-gray-50 p-4 rounded-lg shadow-xl border border-gray-200 w-11/12  "
      >
        <h2 className="text-xl text-center">Word Meaning</h2>
        <p className="text-lg text-center font-bold mt-4 p-4 rounded-lg shadow-md bg-gradient-to-r from-yellow-200 to-green-200 tracking-wide leading-relaxed ring-2 ring-blue-300">
          {selectedTranslation.meaning}
        </p>
        <p className="text-lg text-center font-bold mt-4 p-4 rounded-lg shadow-md bg-gradient-to-r from-yellow-200 to-green-200 tracking-wide leading-relaxed ring-2 ring-blue-300">
          {selectedTranslation.figureOfSpeech}
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
