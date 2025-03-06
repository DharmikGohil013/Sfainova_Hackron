"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiUser, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiLogIn } from "react-icons/fi";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  // Load saved email if remember me was used previously
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when user starts typing
    if (error) setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Save email if remember me is checked
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", formData.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password 
        }),
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(10000)
      });

      // Check for network errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      // Store token in localStorage
      localStorage.setItem("accessToken", data.token);
      
      // Show success feedback before redirecting
      setError("");
      
      // Add a small delay for better UX flow before redirecting
      setTimeout(() => {
        router.push("/dashboard");
      }, 300);

    } catch (err) {
      // Detailed error logging
      console.error("Login Error:", err);
      
      // Handle different error types with user-friendly messages
      if (err.name === "AbortError" || err.name === "TimeoutError") {
        setError("Request timed out. Please try again.");
      } else if (err.message.includes("fetch") || !navigator.onLine) {
        setError("Network error - Please check your internet connection");
      } else if (err.message.includes("401")) {
        setError("Invalid email or password");
      } else if (err.message.includes("429")) {
        setError("Too many attempts. Please try again later.");
      } else {
        setError(err.message || "Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Validate email format
  const isEmailValid = () => {
    if (!formData.email) return true; // Don't show error when empty
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email);
  };

  // Validate password strength if needed
  const isPasswordValid = () => {
    return formData.password.length >= 6;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-emerald-600 mb-3">Welcome Back</h1>
          <p className="text-gray-600 text-lg">Sign in to access your account</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 text-red-700 p-6 rounded-xl mb-8 flex items-center text-lg">
            <FiAlertCircle className="mr-3 flex-shrink-0 text-2xl" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 mb-3 font-medium text-lg" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <FiUser className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`pl-14 pr-6 py-5 text-lg border-2 rounded-xl w-full focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-200 ${
                  !isEmailValid() ? "border-red-500 bg-red-50" : "border-gray-200"
                }`}
                placeholder="your@email.com"
                required
              />
              {!isEmailValid() && (
                <p className="text-red-500 text-base mt-2 pl-4">Please enter a valid email address</p>
              )}
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between mb-3">
              <label className="block text-gray-700 font-medium text-lg" htmlFor="password">
                Password
              </label>
            </div>
            <div className="relative">
              <FiLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-14 pr-14 py-5 text-lg border-2 border-gray-200 rounded-xl w-full focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-200"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xl"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(prev => !prev)}
                className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-3 block text-base text-gray-700">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-base text-emerald-600 hover:text-emerald-500 hover:underline transition-colors font-medium">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 text-white py-5 px-8 rounded-xl w-full hover:bg-emerald-700 transition-all duration-300 transform hover:translate-y-1 flex items-center justify-center text-lg font-semibold disabled:opacity-70 disabled:cursor-not-allowed mt-6 shadow-lg hover:shadow"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </>
            ) : (
              <>
                <FiLogIn className="mr-2 text-xl" /> Sign In
              </>
            )}
          </button>
          
          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-lg">
              Don't have an account?{" "}
              <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium ml-1">
                Create an Account
              </Link>
            </p>
          </div>
        </form>

        {/* Optional: Social Login Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 mb-6 text-lg">Or continue with</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center py-4 px-6 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center py-4 px-6 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <svg className="h-6 w-6 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;