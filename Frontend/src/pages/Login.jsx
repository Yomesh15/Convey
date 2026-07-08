import React, { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  MessageCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:2006/user/login",
        form
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message);
        navigate("/home");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] flex items-center justify-center px-5 py-10">
      <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute top-1/2 left-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[100px]" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,.45)]">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/40">
            <MessageCircle className="text-white" size={30} />
          </div>
        </div>

        <h1 className="text-center text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Login to continue using{" "}
          <span className="font-semibold text-blue-400">Convey</span>.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="relative">
            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="email"
              ref={emailRef}
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  passwordRef.current.focus();
                }
              }}
              className="w-full rounded-xl border border-gray-700 bg-[#111827]/80 py-4 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
            />
          </div>

          <div className="relative">
            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              ref={passwordRef}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onKeyDown={(e)=>{
                if(e.key === "Enter"){
                  handleSubmit()
                }
              }}
              required
              className="w-full rounded-xl border border-gray-700 bg-[#111827]/80 py-4 pl-12 pr-12 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(59,130,246,.45)] disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="my-7 flex items-center">
          <div className="h-px flex-1 bg-gray-700"></div>
          <span className="mx-4 text-sm text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-700"></div>
        </div>

        <button
          type="button"
          className="relative cursor-pointer flex h-14 w-full items-center rounded-xl border border-gray-700 bg-[#111827]/80 text-white transition hover:border-blue-500 hover:bg-[#1f2937]"
        >
          <div className="absolute left-0 flex h-full w-14 items-center justify-center border-r border-gray-700">
            <FaGoogle className="text-xl text-red-500" />
          </div>

          <span className="w-full text-center font-medium ml-9">
            Continue with Google
          </span>
        </button>

        <p className="mt-8 text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-400 hover:text-cyan-400"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;