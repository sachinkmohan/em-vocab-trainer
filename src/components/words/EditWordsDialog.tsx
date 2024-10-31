import { useState, useEffect, useRef } from "react";
import { Word } from "../../interfaces/Word";

interface EditWordsDialogProps {
  word: Word;
  onClose: () => void;
}

const EditWordsDialog: React.FC<EditWordsDialogProps> = ({ word, onClose }) => {
  const [editedWord] = useState<Word>(word);
  const dialogRef = useRef<HTMLDialogElement>(null); // blog

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    onClose();
  };
  return (
    <dialog ref={dialogRef}>
      <h2 className="mt-2 ml-2">Edit Word</h2>
      <div className="flex flex-col space-y-2">
        <label className="flex items-center">
          <span className="w-24 ml-2">Transileration</span>
          <input
            type="text"
            name="word.inTranslit"
            value={editedWord.word.inTranslit}
            className="mx-2 py-1 border rounded"
          />
        </label>

        <label className="flex">
          <span className="w-24 ml-2">Native Script</span>
          <input
            type="text"
            name="word.inNativeScript"
            value={editedWord.word.inNativeScript}
            className="mx-2 py-1 border rounded"
          />
        </label>

        <label className="flex">
          <span className="w-24 ml-2">Meaning</span>
          <input
            type="text"
            name="word.inNativeScript"
            value={editedWord.meaning}
            className="mx-2 py-1 border rounded"
          />
        </label>

        <label className="flex">
          <span className="w-24 ml-2">FoS</span>
          <input
            type="text"
            name="FoS"
            value={editedWord.figureOfSpeech}
            className="mx-2 py-1 border rounded"
          />
        </label>

        <label className="flex">
          <span className="w-24 ml-2">Eg-Translit</span>
          <input
            type="text"
            name="examplestranslit"
            value={editedWord.examples[0]?.inTranslit}
            className="mx-2 py-1 border rounded"
          />
        </label>

        <label className="flex">
          <span className="w-24 ml-2">Eg-Transltn</span>
          <input
            type="text"
            name="examplestranslation"
            value={editedWord.examples[0]?.translation}
            className="mx-2 py-1 border rounded"
          />
        </label>

        <label className="flex">
          <span className="w-24 ml-2">Eg-NatScript</span>
          <input
            type="text"
            name="examplesnativescript"
            value={editedWord.examples[0]?.inNativeScript}
            className="mx-2 py-1 border rounded"
          />
        </label>

        <label className="flex">
          <span className="w-24 ml-2">wordLevel</span>
          <input
            type="text"
            name="wordLevel"
            value={editedWord.wordLevel}
            className="mx-2 py-1 border rounded"
          />
        </label>
      </div>

      <button onClick={handleClose}>Close</button>
    </dialog>
  );
};

export default EditWordsDialog;
