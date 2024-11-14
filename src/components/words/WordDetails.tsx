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
        <div className="flex flex-col items-start pl-3">
          <div className="flex flex-row text-2xl pt-5">
            <h2 className="pr-2 font-bold text-blue-600">Word:</h2>
            <h2>{selectedWord.word.inTranslit}</h2>
            <h2>
              (
              {selectedWord.word.inNativeScript ? (
                selectedWord.word.inNativeScript
              ) : (
                <span className="text-sm">No data available</span>
              )}
              )
            </h2>
          </div>
          <h5 className="pl-16 text-sm text-gray-600">
            {selectedWord.figureOfSpeech
              ? selectedWord.figureOfSpeech
              : "Unknown"}
          </h5>

          <div className="flex text-xl">
            <h2 className="pr-2 font-semibold text-green-600">Translation:</h2>
            <h2 className="text-gray-600">{selectedWord.meaning}</h2>
          </div>

          <div className="flex text-lg mt-4">
            <h2 className="pr-2 font-semibold text-purple-600">Eg(T).:</h2>
            <h2 className="text-gray-600">
              {selectedWord.examples[0].inTranslit
                ? selectedWord.examples[0].inTranslit
                : "No data available"}
            </h2>
          </div>
          <div className="flex text-lg">
            <h2 className="pr-2 font-semibold text-purple-600">Eg(N).:</h2>
            <h2 className="text-gray-600">
              {selectedWord.examples[0].inNativeScript
                ? selectedWord.examples[0].inNativeScript
                : "No data available"}
            </h2>
          </div>
          <div className="flex text-lg">
            <h2 className="pr-2 font-semibold text-purple-600">Transl.:</h2>
            <h2 className="text-gray-600">
              {selectedWord.examples[0].translation
                ? selectedWord.examples[0].translation
                : "No data available"}
            </h2>
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
