import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const HomePage = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("malayalam");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  interface Entry {
    id: string;
    word: string;
    translation: string;
    figureOfSpeech: string;
  }

  const addEntriesToLocalJSON = async (ent: Entry) => {
    try {
      if (selectedLanguage === "malayalam") {
        await fetch("http://localhost:5001/wordsMalayalam", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ent),
        });
      } else if (selectedLanguage === "kannada") {
        await fetch("http://localhost:6001/wordsKannada", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ent),
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const addEntries = async () => {
    const entry = inputValue.split("\n");
    const entryArray: Entry[] = entry.map((w) => {
      const [word, translation, figureOfSpeech] = w.split(",");
      return {
        id: uuidv4(),
        word,
        translation,
        figureOfSpeech,
      };
    });

    try {
      await Promise.all(entryArray.map((ent) => addEntriesToLocalJSON(ent)));
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
        <div className="flex justify-center items-center">
          <button
            type="button"
            className=" bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 ml-4"
            onClick={() => {
              if (window.confirm("Are you sure you want to add these words?")) {
                addEntries();
              }
            }}
          >
            Add Words
          </button>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="ml-4 bg-white border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="malayalam">Malayalam</option>
            <option value="kannada">Kannada</option>
          </select>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
