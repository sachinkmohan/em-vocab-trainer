import { useState } from "react";
import { signInWithEmail } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmail(email, password, navigate);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white  p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          🌴🥥 Easy Malayalam 🥥🌴
        </h2>
        <form onSubmit={handleSignIn}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
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

          {/* Divider */}
          <div className="my-4 border-t border-gray-300"></div>

          <button
            type="button"
            className="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Create new account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
