import { render, screen } from "@testing-library/react";
import WordListContainer from "../../../components/words/WordListContainer";
import "@testing-library/jest-dom";
import { useEditMode } from "../../../components/helpers/EditModeContext";

const mockWords = [
  {
    id: "1",
    word: {
      inTranslit: "test1",
      inNativeScript: "テスト1",
    },
    meaning: "meaning1",
    figureOfSpeech: "noun",
    examples: [
      {
        inTranslit: "example1",
        translation: "translation1",
        inNativeScript: "例1",
      },
    ],
    wordLevel: "beginner",
    pronunciation: "pronunciation1",
  },
  {
    id: "2",
    word: {
      inTranslit: "test2",
      inNativeScript: "テスト2",
    },
    meaning: "meaning2",
    figureOfSpeech: "verb",
    examples: [
      {
        inTranslit: "example2",
        translation: "translation2",
        inNativeScript: "例2",
      },
    ],
    wordLevel: "intermediate",
    pronunciation: "pronunciation2",
  },
];

const mockHandleFavoriteClick = jest.fn();
const mockHandleInfoClick = jest.fn();

jest.mock("../../../components/helpers/EditModeContext", () => ({
  useEditMode: jest.fn(),
}));

describe("WordListContainer", () => {
  it("renders a list of words", () => {
    (useEditMode as jest.Mock).mockReturnValue({ isEditMode: false });
    render(
      <WordListContainer
        words={mockWords}
        highlightedWordId={null}
        favoriteWords={[]}
        handleFavoriteClick={mockHandleFavoriteClick}
        handleInfoClick={mockHandleInfoClick}
      />
    );

    expect(screen.getByText("test1")).toBeInTheDocument();
    expect(screen.getByText("test2")).toBeInTheDocument();
  });

  it("renders edit buttons when in edit mode", () => {
    (useEditMode as jest.Mock).mockReturnValue({ isEditMode: true });

    render(
      <WordListContainer
        words={mockWords}
        highlightedWordId={null}
        favoriteWords={[]}
        handleFavoriteClick={mockHandleFavoriteClick}
        handleInfoClick={mockHandleInfoClick}
      />
    );

    expect(screen.getAllByText("Edit")).toHaveLength(mockWords.length);
  });
});
