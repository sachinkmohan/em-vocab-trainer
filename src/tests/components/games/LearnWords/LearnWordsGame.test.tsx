import { render, screen, fireEvent, act } from "@testing-library/react";
import LearnWordsGame from "../../../../components/games/LearnWords/LearnWordsGame";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  addDoc: jest.fn(),
  doc: jest.fn(),
  collection: jest.fn(),
}));

jest.mock("../../../../../wordsMalayalam.json", () => ({
  wordsMalayalam: [
    {
      id: "word1",
      word: { inTranslit: "apple", inNativeScript: "ആപ്പിൾ" },
      figureOfSpeech: "noun",
      meaning: "a fruit",
      examples: [
        {
          inTranslit: "I ate an apple",
          inNativeScript: "ഞാൻ ഒരു ആപ്പിൾ തിന്നു",
          translation: "I ate an apple",
        },
      ],
    },
    {
      id: "word2",
      word: { inTranslit: "banana", inNativeScript: "ബനാന" },
      figureOfSpeech: "noun",
      meaning: "a fruit",
      examples: [
        {
          inTranslit: "I ate a banana",
          inNativeScript: "ഞാൻ ഒരു ബനാന തിന്നു",
          translation: "I ate a banana",
        },
      ],
    },
  ],
}));

describe("Learn Words Game", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("userID", "testUserID");
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("clicking Yes adds an entry to Firebase and updates localStorage", async () => {
    render(
      <Router>
        <LearnWordsGame />
      </Router>
    );

    const yesButton = screen.getByText("Yes");

    await act(async () => {
      fireEvent.click(yesButton);
    });

    const learnedWords = JSON.parse(
      localStorage.getItem("learnedWordsID") ?? "[]"
    );
    expect(learnedWords).toContain("word1");
    expect(learnedWords.length).toBe(1);
  });
});
