import { useWords } from "../components/helpers/WordsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const WordList = () => {
  const words = useWords();
  console.log(words);

  return (
    <>
      <div className="p-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {words.map((word, index) => {
            return (
              <li
                key={index}
                className="flex justify-between items-center border border-blue-300"
              >
                {" "}
                {word.word}{" "}
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="text-blue-500"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default WordList;
