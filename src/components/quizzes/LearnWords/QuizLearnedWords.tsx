import { useEffect, useState } from "react";

const QuizLearnedWords = () => {
  const [learnedWordsLength, setLearnedWordsLength] = useState<number>(0);

  useEffect(() => {
    const storedLearnedWords = localStorage.getItem("learnedWordsID");
    if (storedLearnedWords) {
      const parsedLearnedWords = JSON.parse(storedLearnedWords);
      setLearnedWordsLength(parsedLearnedWords.length);
    }
  }, []);

  return <div className="mt-4">{learnedWordsLength > 2 && <p>Hello</p>}</div>;
};

export default QuizLearnedWords;
