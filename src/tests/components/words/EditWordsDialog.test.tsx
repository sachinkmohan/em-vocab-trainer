import { render, screen, fireEvent } from "@testing-library/react";
import EditWordsDialog from "../../../components/words/EditWordsDialog";
import "@testing-library/jest-dom";

const mockWord = {
  id: "1",
  word: {
    inTranslit: "test1",
    inNativeScript: "pareekshanam",
  },
  meaning: "meaning1",
  figureOfSpeech: "noun",
  examples: [
    {
      inTranslit: "example1",
      translation: "translation1",
      inNativeScript: "pareekshanam 1",
    },
  ],
  wordLevel: "beginner",
  pronunciation: "pronunciation1",
};

describe("EditWordsDialog", () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  it("shows the dialog on mount", () => {
    render(<EditWordsDialog word={mockWord} onClose={jest.fn()} />);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });

  it("renders the dialog with word details", () => {
    render(<EditWordsDialog word={mockWord} onClose={jest.fn()} />);
    expect(screen.getByText("Edit Word")).toBeInTheDocument();
    expect(screen.getByDisplayValue("test1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("pareekshanam")).toBeInTheDocument();
    expect(screen.getByDisplayValue("meaning1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("noun")).toBeInTheDocument();
    expect(screen.getByDisplayValue("example1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("translation1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("pareekshanam 1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("beginner")).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const mockOnClose = jest.fn();
    render(<EditWordsDialog word={mockWord} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText("Close"));
    expect(mockOnClose).toHaveBeenCalled();
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });
});
