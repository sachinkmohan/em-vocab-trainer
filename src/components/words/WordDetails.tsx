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
  selectedWord: Word;
  closeDialog: () => void;
}
const WordDetails = forwardRef<HTMLDialogElement, WordDetailsProps>(
  ({ selectedWord, closeDialog }, ref) => {
    return (
      <dialog
        ref={ref}
        className="fixed max-w-md h-1/3 bg-gray-50 p-4 rounded-lg shadow-xl border border-gray-200 w-11/12  "
      >
        <div className="flex flex-col items-start">
          <div className="flex flex-row text-2xl pt-5">
            <h2 className="pr-2 text-bol">Word:</h2>
            <h2>{selectedWord.word.inTranslit}</h2>
            <h2>({selectedWord.word.inNativeScript})</h2>
          </div>
          <h5 className="pl-16 text-sm">{selectedWord.figureOfSpeech}</h5>

          <div className="flex text-xl">
            <h2 className="pr-2">Translation:</h2>
            <h2>{selectedWord.meaning}</h2>
          </div>

          <div className="flex text-lg mt-4">
            <h2 className="pr-2">Eg(T).:</h2>
            <h2>{selectedWord.examples[0].inTranslit}</h2>
          </div>
          <div className="flex text-lg">
            <h2 className="pr-2">Eg(N).:</h2>
            <h2>{selectedWord.examples[0].inNativeScript}</h2>
          </div>
          <div className="flex text-lg">
            <h2 className="pr-2">Transl.:</h2>
            <h2>{selectedWord.examples[0].translation}</h2>
          </div>
        </div>

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
