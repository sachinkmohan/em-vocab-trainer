import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/dom";
import Login from "../../components/Login";
import { signInWithEmail } from "../../utils/firebaseConfig";
import { BrowserRouter, useNavigate } from "react-router-dom";

// Mocking the signInWithEmail function and useNavigate function
jest.mock("../../utils/firebaseConfig", () => ({
  signInWithEmail: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Login Component", () => {
  it("allows user to login", async () => {
    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Simulate user input
    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "password145" },
    });

    // Simulate form submission
    fireEvent.click(getByText("Login In"));

    // Wait for the signInWithEmail function to be called

    await waitFor(() => {
      expect(signInWithEmail).toHaveBeenCalledWith(
        "user@example.com",
        "password145",
        expect.any(Function)
      );
    });
  });
});
