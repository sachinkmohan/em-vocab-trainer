import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "../../components/HomePage.tsx";
import { v4 as uuidv4 } from "uuid";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

describe("add a new word to the mainWords collection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
  });

  test("HomePage component should be imported correctly", () => {
    expect(HomePage).toBeDefined();
  });

  test("should add a new word to the mainWords collection", async () => {
    render(<HomePage />);

    const wordInput = screen.getByPlaceholderText(
      "word, translation, figure of speech"
    );
    const addButton = screen.getByText("Add Words");

    uuidv4.mockReturnValue("mock-uuid");

    // simulate user typing comma-seperated words
    fireEvent.change(wordInput, {
      target: { value: "namaskaram,hello,noun" },
    });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith("http://localhost:5174/words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "mock-uuid",
          word: "namaskaram",
          translation: "hello",
          figureOfSpeech: "noun",
        }),
      });
    });

    await waitFor(() => {
      expect(wordInput.value).toBe("");
    });
  });

  test("should add a new word to the mainWords collection", async () => {
    render(<HomePage />);

    const wordInput = screen.getByPlaceholderText(
      "word, translation, figure of speech"
    );
    const addButton = screen.getByText("Add Words");

    console.log = jest.fn();

    uuidv4
      .mockReturnValueOnce("mock-uuid-1")
      .mockReturnValueOnce("mock-uuid-2")
      .mockReturnValueOnce("mock-uuid-3");

    // simulate user typing comma-seperated words
    fireEvent.change(wordInput, {
      target: {
        value: "orangu,sleep,verb\nchirichu,laughed,verb\nkaranju,cried,verb",
      },
    });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(global.fetch).toHaveBeenCalledWith("http://localhost:5174/words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "mock-uuid-1",
          word: "orangu",
          translation: "sleep",
          figureOfSpeech: "verb",
        }),
      });
      expect(global.fetch).toHaveBeenCalledWith("http://localhost:5174/words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "mock-uuid-2",
          word: "chirichu",
          translation: "laughed",
          figureOfSpeech: "verb",
        }),
      });
      expect(global.fetch).toHaveBeenCalledWith("http://localhost:5174/words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "mock-uuid-3",
          word: "karanju",
          translation: "cried",
          figureOfSpeech: "verb",
        }),
      });
    });

    await waitFor(() => {
      expect(wordInput.value).toBe("");
    });
  });
});
