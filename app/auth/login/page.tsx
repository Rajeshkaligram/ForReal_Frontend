"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email: form.email, password: form.password });
      router.push("/profile");
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Invalid email or password.";

      if (
        msg.toLowerCase().includes("activation") ||
        msg.toLowerCase().includes("verify") ||
        msg.toLowerCase().includes("confirm")
      ) {
        setError("📧 " + msg);
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
 <>
    <div className=" flex items-center justify-center  px-4 pt-6 md:pt-12">
      <div className="w-full max-w-md border border-gray-200 p-10 ">
        
        {/* Top Text */}
        <p className="sec_tagline">
          WELCOME BACK
        </p>

        <h1 className="text-lg md:text-[32px] font-serif mb-8 leading-snug">
          Sign in to <br />
          <span className="italic">your account.</span>
        </h1>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="text-[11px] tracking-[2px] text-gray-400 block mb-2">
              EMAIL
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="you@example.com"
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
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
                placeholder="Your password"
                className="w-full border border-gray-300 px-4 py-3 text-sm pr-12 outline-none focus:border-black"
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

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full hover:bg-black/85 text-white py-3 text-sm tracking-widest flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && (
              <Loader2 size={14} className="animate-spin" />
            )}
            {loading ? "SIGNING IN..." : "SIGN IN"}
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
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-black underline">
            Create one
          </Link>
        </p></>
  );
}