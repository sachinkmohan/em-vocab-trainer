import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "../../components/HomePage.tsx";
import { addDoc, collection, getFirestore } from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
  getFirestore: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

describe("add a new word to the mainWords collection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("HomePage component should be imported correctly", () => {
    expect(HomePage).toBeDefined();
  });

  test("should add a new word to the mainWords collection", async () => {
    render(<HomePage />);

    const wordInput = screen.getByPlaceholderText("Enter words");
    const addButton = screen.getByText("Add Words");

    console.log = jest.fn();

    // const mockFirestore = {}; // Mock Firestore instance
    // getFirestore.mockReturnValue(mockFirestore);
    addDoc.mockResolvedValue({ id: "mocDocId" });

    // simulate user typing comma-seperated words
    fireEvent.change(wordInput, {
      target: { value: "namaskaram,hello,noun" },
    });
    fireEvent.click(addButton);
    expect(addDoc).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledTimes(1);
      expect(collection).toHaveBeenCalledWith(undefined, "mainWords");
    });
    expect(addDoc).toHaveBeenCalledWith(undefined, {
      word: "namaskaram",
      translation: "hello",
      figureOfSpeech: "noun",
    });

    await waitFor(() => {
      expect(wordInput.value).toBe("");
    });
    // expect(console.log).toHaveBeenLastCalledWith([
    //   { figureOfSpeech: " noun", translation: " hello", word: "namaskaram" },
    // ]);
  });

  test("should add a new word to the mainWords collection", async () => {
    render(<HomePage />);

    const wordInput = screen.getByPlaceholderText("Enter words");
    const addButton = screen.getByText("Add Words");

    console.log = jest.fn();

    addDoc.mockResolvedValue({ id: "mocDocId" });

    // simulate user typing comma-seperated words
    fireEvent.change(wordInput, {
      target: {
        value: "orangu,sleep,verb\nchirichu,laughed,verb\nkaranju,cried,verb",
      },
    });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledTimes(3);
      expect(addDoc).toHaveBeenCalledWith(undefined, {
        word: "orangu",
        translation: "sleep",
        figureOfSpeech: "verb",
      });
      expect(addDoc).toHaveBeenCalledWith(undefined, {
        word: "chirichu",
        translation: "laughed",
        figureOfSpeech: "verb",
      });
      expect(addDoc).toHaveBeenCalledWith(undefined, {
        word: "karanju",
        translation: "cried",
        figureOfSpeech: "verb",
      });
    });

    await waitFor(() => {
      expect(wordInput.value).toBe("");
    });
  });
});
