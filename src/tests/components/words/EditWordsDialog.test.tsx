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
  const mockOnClose = jest.fn();
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

  it("updates the state when input fields are changed", () => {
    render(<EditWordsDialog word={mockWord} onClose={mockOnClose} />);

    const translitInput = screen.getByDisplayValue("test1");
    fireEvent.change(translitInput, { target: { value: "updatedTest1" } });
    expect(translitInput).toHaveValue("updatedTest1");

    const nativeScriptInput = screen.getByDisplayValue("pareekshanam");
    fireEvent.change(nativeScriptInput, { target: { value: "aanamutta" } });
    expect(nativeScriptInput).toHaveValue("aanamutta");

    const meaningInput = screen.getByDisplayValue("meaning1");
    fireEvent.change(meaningInput, { target: { value: "updatedMeanining" } });
    expect(meaningInput).toHaveValue("updatedMeanining");

    const figureOfSpeechInput = screen.getByDisplayValue("noun");
    fireEvent.change(figureOfSpeechInput, { target: { value: "pronoun" } });
    expect(figureOfSpeechInput).toHaveValue("pronoun");

    const exampleTranslitInput = screen.getByDisplayValue("example1");
    fireEvent.change(exampleTranslitInput, {
      target: { value: "updatedExample1" },
    });
    expect(exampleTranslitInput).toHaveValue("updatedExample1");

    const exampleTranslationInput = screen.getByDisplayValue("translation1");
    fireEvent.change(exampleTranslationInput, {
      target: { value: "updatedTranslation now" },
    });
    expect(exampleTranslationInput).toHaveValue("updatedTranslation now");

    const exampleNativeScriptInput = screen.getByDisplayValue("pareekshanam 1");
    fireEvent.change(exampleNativeScriptInput, {
      target: { value: "updatedPareekshanam 1" },
    });
    expect(exampleNativeScriptInput).toHaveValue("updatedPareekshanam 1");

    const wordLevelInput = screen.getByDisplayValue("beginner");
    fireEvent.change(wordLevelInput, {
      target: { value: "advanced" },
    });
    expect(wordLevelInput).toHaveValue("advanced");
  });
});
