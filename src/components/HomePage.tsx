import { useState } from "react";
import { db } from "../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

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
    const docRef = await addDoc(wordsCollection, ent);

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
    } catch (e) {
      console.error("Error adding document: ", e);
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
          placeholder="Enter words"
          onChange={handleInputChange}
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
    </div>
  );
};

export default HomePage;
