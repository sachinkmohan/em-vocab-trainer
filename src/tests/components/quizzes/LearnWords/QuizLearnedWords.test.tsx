import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import QuizLearnedWords from "../../../../components/quizzes/LearnWords/QuizLearnedWords";

describe("QuizLearnedWords", () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn((key) => {
      if (key === "learnedWordsID") {
        return JSON.stringify([1, 2, 3]);
      }
      return null;
    });
  });
  it("renders Hello when learnWordsLength is greater than 2", () => {
    render(<QuizLearnedWords />);
    const helloText = screen.getByText(/Hello/i);
    expect(helloText).toBeInTheDocument();
  });
});
