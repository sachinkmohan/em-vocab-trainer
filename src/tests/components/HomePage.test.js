import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "../../components/HomePage.tsx";

describe("add a new word to the mainWords collection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("HomePage component should be imported correctly", () => {
    expect(HomePage).toBeDefined();
  });

  test("should add a new word to the mainWords collection", () => {
    render(<HomePage />);

    const wordInput = screen.getByPlaceholderText("Enter words");
    const addButton = screen.getByText("Add Words");

    console.log = jest.fn();

    // simulate user typing comma-seperated words
    fireEvent.change(wordInput, {
      target: { value: "namaskaram, hello, noun" },
    });
    fireEvent.click(addButton);
    expect(console.log).toHaveBeenLastCalledWith([
      { figureOfSpeech: " noun", translation: " hello", word: "namaskaram" },
    ]);
  });

  test("should add a new word to the mainWords collection", () => {
    render(<HomePage />);

    const wordInput = screen.getByPlaceholderText("Enter words");
    const addButton = screen.getByText("Add Words");

    console.log = jest.fn();

    // simulate user typing comma-seperated words
    fireEvent.change(wordInput, {
      target: {
        value: "orangu, sleep, verb\nchirichu,laughed,verb\nkaranju,cried,verb",
      },
    });
    fireEvent.click(addButton);
    expect(console.log).toHaveBeenLastCalledWith([
      { figureOfSpeech: " verb", translation: " sleep", word: "orangu" },
      { figureOfSpeech: "verb", translation: "laughed", word: "chirichu" },
      { figureOfSpeech: "verb", translation: "cried", word: "karanju" },
    ]);
  });
});
