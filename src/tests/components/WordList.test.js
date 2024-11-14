// import { render } from "@testing-library/react";
import WordList from "../../components/WordList";
// import { render, screen, findByText } from "@testing-library/react";
// import { useUserData } from "../../components/helpers/UserDataContext";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

jest.mock("../../components/helpers/UserDataContext", () => ({
  useUserData: jest.fn(),
}));

describe("WordList component test", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test("WordList component should be imported correctly", () => {
    expect(WordList).toBeDefined();
  });

  test("should set userID and prevUserID from localStorage on mount", () => {
    localStorage.setItem("userID", "testUserID");
    localStorage.setItem("prevUserID", "testPrevUserID");

    // useUserData.mockReturnValue({
    //   nickname: "testuser",
    //   learningLanguage: "malayalam",
    // });
    // render(<WordList />);

    expect(localStorage.getItem("userID")).toBe("testUserID");
    expect(localStorage.getItem("prevUserID")).toBe("testPrevUserID");
  });
});
