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
      </div>

      <button onClick={handleClose}>Close</button>
    </dialog>
  );
};

export default EditWordsDialog;
