import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sentEmailAddress, setSentEmailAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent");
      setSentEmailAddress(email);
      setEmail("");
    } catch (error) {
      setMessage("Error sending password reset email.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 ">Reset your account</h2>

        <form onSubmit={handleSubmit}>
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
            Send reset password link
          </button>
        </form>

        {message && (
          <div
            className={`text-center mt-4  p-4 rounded ${
              message.includes("sent")
                ? "text-green-700 bg-green-100"
                : "text-red-700 bg-red-100"
            }`}
          >
            {message.includes("sent")
              ? `Password reset email sent to ${sentEmailAddress}`
              : message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
