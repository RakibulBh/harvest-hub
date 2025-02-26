"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Import Next.js router for redirection
import Header from "./header";
import { Footer } from "./Footer"; 

const RegisterPage = () => {
  const [form, setForm] = useState({
    farmName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // ✅ Initialize router

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.push("/login"); // ✅ Redirect user after 3 seconds
      }, 3000);
    }
  }, [success, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.farmName || !form.phone || !form.email || !form.password || !form.confirmPassword || !form.location) {
      setError("All fields are required!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setSuccess("✅ Registration successful! Redirecting to login...");
        setForm({
          farmName: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
          location: "",
        });
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-[#2b6144]">Farmer Registration</h2>

          {/* Error & Success Messages */}
          {error && <p className="text-red-600 font-medium text-center mt-2">{error}</p>}
          {success && (
            <p className="text-green-600 font-medium text-center mt-2 animate-bounce">{success}</p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {["farmName", "phone", "email", "password", "confirmPassword", "location"].map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  name={field}
                  type={field.includes("password") ? "password" : "text"}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  value={form[field as keyof typeof form]}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 p-2 mt-2 text-[#2b6144] focus:border-[#f4b400] focus:outline-none"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading || success !== null}
              className="bg-[#f4b400] hover:bg-[#e0a300] transition-transform transform hover:scale-105 text-white w-full py-3 rounded-lg font-semibold shadow-md disabled:opacity-50"
            >
              {loading ? "Registering..." : success ? "✅ Registered!" : "Create Farmer Account"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterPage;


