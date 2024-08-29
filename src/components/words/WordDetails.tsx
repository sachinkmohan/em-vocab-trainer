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
        className="relative bg-white p-4 rounded shadow-lg w-[375px] h-[375px]"
      >
        <h2>Word Meaning</h2>
        <p>{selectedTranslation}</p>
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
