import WordList from "../../components/WordList";
import { render, screen, findByText } from "@testing-library/react";
jest.mock("firebase/firestore", () => {
  (getDocs) => jest.fn(() => mockWords);
});
const mockWords = [
  {
    id: "1",
    word: "namaskaram",
    translation: "hello",
    figureOfSpeech: "noun",
  },
  {
    id: "2",
    word: "nanni",
    translation: "thank you",
    figureOfSpeech: "noun",
  },
  {
    id: "3",
    word: "joli",
    translation: "work",
    figureOfSpeech: "noun",
  },
];

describe("WordList component test", () => {
  test("WordList component should be imported correctly", () => {
    expect(WordList).toBeDefined();
  });

  test("fetches and displays words from the mainWords collection", async () => {
    const { findByText } = render(<WordList />);
    expect(await findByText("namaskaram")).toBeInTheDocument();
  });
});
