"use client";
import React, { useState } from "react";
import PasswordInput from "./PasswordInput";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginPage = ({ onLogin }) => {
  const router = useRouter();
  const [password, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setNewEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      setErrorMessage("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);
      toast.success("Login successful");
      onLogin();
      router.push("/map");
    } catch (error) {
      setErrorMessage(error.message);
      toast.error("Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);
      toast.success("Account created successfully");
      setIsCreatingAccount(false);
      router.push("/map");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full overflow-hidden relative px-4 py-8">
      <div className="absolute inset-0 z-0">
        <img
          src="/hazy_image.jpg"
          alt="City view background"
          className="w-full h-full object-cover filter blur-[2px]"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="amber-glassmorphism w-full max-w-md rounded-2xl overflow-hidden py-8 px-6 md:px-10 animate-fade-in flex flex-col items-center relative z-10">
        <h1 className="text-2xl font-semibold text-amber-900 mb-6 animate-slide-up">
          {isCreatingAccount ? "Create an Account" : "Sign in with Email"}
        </h1>

        {isCreatingAccount ? (
          <form onSubmit={handleCreateAccount} className="w-full space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="amber-input-field w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-800"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setNewEmail(e.target.value)}
              className="amber-input-field w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-800"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="amber-input-field w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-800"
            />
            <PasswordInput
              name="password"
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
              className="amber-input-field"
              placeholder="Password"
            />
            <PasswordInput
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="amber-input-field"
              placeholder="Confirm Password"
            />
            <button
              type="submit"
              className="auth-button bg-green-600 text-white hover:bg-green-700 animate-slide-up w-full py-2 rounded-lg"
            >
              Create Account
            </button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <span
                className="text-amber-800 cursor-pointer font-semibold"
                onClick={() => setIsCreatingAccount(false)}
              >
                Sign in
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setNewEmail(e.target.value)}
              className="amber-input-field w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-800"
            />
            <PasswordInput
              name="password"
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
              className="amber-input-field"
            />
            {errorMessage && (
              <p className="text-red-600 text-sm text-center animate-fade-in">
                {errorMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="auth-button bg-amber-800 text-white hover:bg-amber-900 animate-slide-up w-full py-2 rounded-lg"
            >
              {isSubmitting ? "Signing in..." : "Get Started"}
            </button>
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <span
                className="text-amber-800 cursor-pointer font-semibold"
                onClick={() => setIsCreatingAccount(true)}
              >
                Create one
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
