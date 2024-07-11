import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "../../components/HomePage";
// import { db } from "../../utils/firebaseConfig";

// jest.mock("../../utils/firebaseConfig"),
//   () => ({
//     db: {
//       collection: jest.fn().mockReturnThis(),
//       add: jest.fn(),
//     },
//   });

describe("add a new word to the mainWords collection", () => {
  test("should add a new word to the mainWords collection", () => {
    render(<HomePage />);

    const wordInput = screen.getByPlaceholderText("Enter words");
    const addButton = screen.getByText("Add Words");

    // simulate user typing comma-seperated words
    fireEvent.change(wordInput, {
      target: { value: "namaskaram, hello, noun" },
    });
    fireEvent.click(addButton);
  });
});
