import { useState } from "react";
import { signInWithEmail } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorMessage = await signInWithEmail(email, password, navigate);
    if (errorMessage) {
      if (errorMessage === "auth/too-many-requests") {
        const errorMessageToUser =
          "Too many failed login attempts. Please try again later.";
        setError(errorMessageToUser);
        return;
      }
      const errorMessageToUser = "Invalid email or password. Please try again.";
      setError(errorMessageToUser);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white  p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          🇮🇳 Vocab Trainer 🇮🇳
        </h2>
        <form onSubmit={handleSignIn}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
            />
          </div>
          <div className="py-2">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>

          {error && (
            <div className="text-red-700 bg-red-100 p-4 my-4 rounded">
              {error}
            </div>
          )}

          <div className="text-center my-2">
            <a
              href="/forgot-password"
              className="text-blue-700 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-gray-300"></div>

          <button
            type="button"
            className="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
            onClick={() => navigate("/signup")}
          >
            Create new account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
