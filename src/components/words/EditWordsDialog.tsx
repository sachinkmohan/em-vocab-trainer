import { useState, useEffect, useRef } from "react";
import { Word } from "../../interfaces/Word";
import { toast } from "react-toastify";
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

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/wordsMalayalam/${editedWord.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedWord),
        }
      );
      if (!response.ok) {
        toast.error("Failed to update word!");
        throw new Error("Failed to update Word");
      }

      toast.success("Word succesfully updated!");
      handleClose();
    } catch (error) {
      toast.error("JSON Server not started!");
      console.error("Error.updating word:", error);
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

      <div className="flex justify-end space-x-2 my-4 mr-2">
        <button onClick={handleClose} className="px-4 py-2 bg-gray-300 rounded">
          Close
        </button>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Update
        </button>
      </div>
    </dialog>
  );
};

export default EditWordsDialog;
