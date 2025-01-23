import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 ">Reset your account</h2>

        <form>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full border rounded-md p-2 mb-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded-md">
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
