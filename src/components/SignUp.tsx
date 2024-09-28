import { useState } from "react";
import { signUpWithEmail } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [instaHandle, setInstaHandle] = useState("");
  const [learningLanguage, setLearningLanguage] = useState("");
  const [languageLevel, setLanguageLevel] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const initialRoles = ["user"];
        await signUpWithEmail(
          email,
          instaHandle,
          password,
          nickname,
          name,
          learningLanguage,
          languageLevel,
          initialRoles,
          navigate
        );
        alert("Sign up successful");
      } catch (error) {
        console.error("Error during sign up in signup page:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!name) errors.name = "Name is required";
    if (!nickname) errors.nickname = "Nickname is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (password !== repeatPassword)
      errors.repeatPassword = "Passwords do not match";
    if (!learningLanguage) errors.learningLanguage = "One language is required";
    if (!languageLevel) errors.languageLevel = "One level is required";
    return errors;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white  p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="py-1">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 "
            ></input>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="py-1">
            <input
              type="text"
              placeholder="Nick Name"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 "
            ></input>
            {errors.nickname && (
              <p className="text-red-500 text-sm">{errors.nickname}</p>
            )}
          </div>

          <div className="py-1">
            <input
              type="text"
              placeholder="Instagram Handle - Optional Field"
              value={instaHandle}
              onChange={(e) => setInstaHandle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
            />
          </div>

          <div className="py-1">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="py-1">
            <select
              value={learningLanguage}
              onChange={(e) => setLearningLanguage(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
            >
              <option value="">Select Language</option>
              <option value="malayalam">Malayalam</option>
              <option value="kannada">Kannada</option>
            </select>
            {errors.learningLanguage && (
              <p className="text-red-500 text-sm">{errors.learningLanguage}</p>
            )}
          </div>

          <div className="py-1">
            <select
              value={languageLevel}
              onChange={(e) => setLanguageLevel(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
            >
              <option value="">Select Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            {errors.languageLevel && (
              <p className="text-red-500 text-sm">{errors.languageLevel}</p>
            )}
          </div>

          <div className="py-1">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="py-1">
            <input
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
            />
            {errors.repeatPassword && (
              <p className="text-red-500 text-sm">{errors.repeatPassword}</p>
            )}
          </div>
          <button
            type="submit"
            onClick={handleSignUp}
            className="w-full bg-blue-500 text-white py-2 mt-1 rounded-md hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
