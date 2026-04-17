"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.password_confirmation) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setSuccess("");

    try {
      const isLogged = await register({
        ...form,
        terms_condition: "1",
        device_type: "web",
      });

      if (isLogged) {
        router.push("/profile");
      } else {
        setSuccess(
          "Your account was successfully created. Please check your email to confirm your account.",
        );
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black";

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 pt-6 md:pt-12">
        <div className="w-full max-w-md border border-gray-200 p-10 ">
          {/* Heading */}
          <p className="sec_tagline">
            CREATE ACCOUNT
          </p>

          <h1 className="text-lg md:text-[32px] font-serif mb-8 leading-snug font-medium ">
            Join <br />
            <span className="italic">FoReal.</span>
          </h1>

          {/* Alerts */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 mb-6">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="text-[11px] tracking-[2px] text-gray-400 block mb-2">
                FULL NAME
              </label>
              <input
                type="text"
                required
                value={form.first_name + " " + form.last_name}
                onChange={(e) => {
                  const value = e.target.value.split(" ");
                  setForm({
                    ...form,
                    first_name: value[0] || "",
                    last_name: value.slice(1).join(" ") || "",
                  });
                }}
                placeholder="Your name"
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-[11px] tracking-[2px] text-gray-400 block mb-2">
                EMAIL
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-[11px] tracking-[2px] text-gray-400 block mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Min. 6 characters"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>

              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-[11px] tracking-[2px] text-gray-400 block mb-2">
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                required
                value={form.password_confirmation}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password_confirmation: e.target.value,
                  })
                }
                placeholder="Repeat password"
                className={inputClass}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-black/85 text-white py-3 text-sm tracking-widest flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              {loading ? "CREATING..." : "CREATE ACCOUNT"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300" />
              <span className="px-3 text-[10px] text-gray-400 tracking-widest">
            OR CONTINUE WITH
          </span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-3">
            <button className="border  border-muted/30 hover:border-primary py-3 px-6 flex items-center justify-center hover:bg-muted/10 transition">
              <FcGoogle size={20} />
            </button>

            <button className="border  border-muted/30 hover:border-primary py-3 px-6 flex items-center justify-center hover:bg-muted/10 transition">
              <FaApple size={20} />
            </button>

            <button className="border  border-muted/30 hover:border-primary py-3 px-6 flex items-center justify-center hover:bg-muted/10 transition">
              <HiOutlineMail size={20} />
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-[12.48px] text-gray-500 py-8">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-black underline">
          Sign in
        </Link>
      </p>

    </>
  );
}
