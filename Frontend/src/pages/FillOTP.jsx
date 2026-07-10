import React, { useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FillOTP = () => {
  const navigate = useNavigate();

  const inputs = useRef([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");

    e.target.value = value;

    if (value && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const verifyOtp = async () => {
    const otp = inputs.current.map((input) => input.value).join("");

    if (otp.length !== 4) {
      return toast.error("Enter complete OTP");
    }

    const email = localStorage.getItem("verifyEmail");

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/verify-otp`,
        {
          email,
          otp,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        localStorage.removeItem("verifyEmail");

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-5">

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">

        <div className="mt-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/20">
            <ShieldCheck className="text-blue-400" size={28} />
          </div>
        </div>

        <h1 className="mt-5 text-center text-3xl font-bold text-white">
          Verify OTP
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Enter the 4-digit verification code sent to your email.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          {[0, 1, 2, 3].map((item) => (
            <input
              key={item}
              ref={(el) => (inputs.current[item] = el)}
              maxLength={1}
              type="text"
              inputMode="numeric"
              onChange={(e) => handleChange(e, item)}
              onKeyDown={(e) => handleKeyDown(e, item)}
              className="h-16 w-16 rounded-2xl border border-gray-700 bg-[#111827]/80 text-center text-2xl font-bold text-white outline-none focus:border-blue-500"
            />
          ))}
        </div>

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="mt-10 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 text-lg font-semibold text-white"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

export default FillOTP;