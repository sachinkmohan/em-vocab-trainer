import { useState, useEffect, useRef } from "react";
import { Word } from "../../interfaces/Word";

interface EditWordsDialogProps {
  word: Word;
  onClose: () => void;
}

const EditWordsDialog: React.FC<EditWordsDialogProps> = ({ word, onClose }) => {
  const [editedWord, setEditedWord] = useState<Word>(word);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 2) {
      const [key, subkey] = keys;
      setEditedWord((prevWord) => ({
        ...prevWord,
        [key]: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(prevWord[key as keyof Word] as any),
          [subkey]: value,
        },
      }));
    } else if (keys.length === 3) {
      // Handle array properties
      const [arrayKey, index, subkey] = keys;
      setEditedWord((prevWord) => ({
        ...prevWord,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [arrayKey]: (prevWord[arrayKey as keyof Word] as any).map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any, i: number) =>
            i === parseInt(index) ? { ...item, [subkey]: value } : item
        ),
      }));
    } else {
      setEditedWord((prevWord) => ({
        ...prevWord,
        [name]: value,
      }));
    }
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
            onChange={handleChange}
            className="mx-2 py-1 border rounded"
          />
        </label>

        <label className="flex">
          <span className="w-24 ml-2">Native Script</span>
          <input
            type="text"
            name="word.inNativeScript"
            value={editedWord.word.inNativeScript}
            onChange={handleChange}
            className="mx-2 py-1 border rounded"
          />
        </label>

        <label className="flex">
          <span className="w-24 ml-2">Meaning</span>
          <input
            type="text"
            name="meaning"
            value={editedWord.meaning}
            onChange={handleChange}
            className="mx-2 py-1 border rounded"
          />
        </label>

        <label className="flex">
          <span className="w-24 ml-2">FoS</span>
          <input
            type="text"
            name="figureOfSpeech"
            value={editedWord.figureOfSpeech}
            onChange={handleChange}
            className="mx-2 py-1 border rounded"
          />
        </label>

        <label className="flex">
          <span className="w-24 ml-2">Eg-Translit</span>
          <input
            type="text"
            name="examples.0.inTranslit"
            value={editedWord.examples[0]?.inTranslit}
            onChange={handleChange}
            className="mx-2 py-1 border rounded"
          />
        </label>

        <label className="flex">
          <span className="w-24 ml-2">Eg-Transltn</span>
          <input
            type="text"
            name="examples.0.translation"
            value={editedWord.examples[0]?.translation}
            onChange={handleChange}
            className="mx-2 py-1 border rounded"
          />
        </label>

        <label className="flex">
          <span className="w-24 ml-2">Eg-NatScript</span>
          <input
            type="text"
            name="examples.0.inNativeScript"
            value={editedWord.examples[0]?.inNativeScript}
            onChange={handleChange}
            className="mx-2 py-1 border rounded"
          />
        </label>

        <label className="flex">
          <span className="w-24 ml-2">wordLevel</span>
          <input
            type="text"
            name="wordLevel"
            value={editedWord.wordLevel}
            onChange={handleChange}
            className="mx-2 py-1 border rounded"
          />
        </label>
      </div>

      <button onClick={handleClose}>Close</button>
    </dialog>
  );
};

export default EditWordsDialog;
