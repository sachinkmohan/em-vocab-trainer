import { useState } from "react";
import { db } from "../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { DocumentReference } from "firebase/firestore/lite";
import { ToastContainer, toast } from "react-toastify";

const HomePage = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  interface Entry {
    word: string;
    translation: string;
    figureOfSpeech: string;
  }

  const addEntriesToFSDB = async (ent: Entry) => {
    const wordsCollection = collection(db, "mainWords");
    const docRef = (await addDoc(
      wordsCollection,
      ent
    )) as DocumentReference<Entry>;

    console.log("Document written with ID: ", docRef.id);
  };

  const addEntries = async () => {
    const entry = inputValue.split("\n");
    const entryArray: Entry[] = entry.map((w) => {
      const [word, translation, figureOfSpeech] = w.split(",");
      return {
        word,
        translation,
        figureOfSpeech,
      };
    });

    try {
      await Promise.all(entryArray.map((ent) => addEntriesToFSDB(ent)));
      console.log("all words added successfully");
      toast.success("Words added successfully", {
        position: "top-right",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Error adding words", {
        position: "top-right",
      });
    } finally {
      setInputValue("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-lg space-y-4" data-testid="home-page">
        <textarea
          className="w-full border  border-gray-300 rounded-md "
          rows={10}
          placeholder="word, translation, figure of speech"
          onChange={handleInputChange}
          value={inputValue}
        />
        <div className="flex justify-center">
          <button
            type="button"
            className=" bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 ml-4"
            onClick={addEntries}
          >
            Add Words
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
