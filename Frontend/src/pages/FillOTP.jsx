import React, { useRef } from "react";
import { MessageCircle, ShieldCheck } from "lucide-react";

const FillOTP = () => {
  const inputs = useRef([]);

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

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-5">

      <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[100px]" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,.45)]">

        <div className="flex justify-center">
          {/* <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/40">
            <MessageCircle size={30} className="text-white" />
          </div> */}
        </div>

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
              type="text"
              inputMode="numeric"
              maxLength={1}
              onChange={(e) => handleChange(e, item)}
              onKeyDown={(e) => handleKeyDown(e, item)}
              className="h-16 w-16 rounded-2xl border border-gray-700 bg-[#111827]/80 text-center text-2xl font-bold text-white outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
            />
          ))}
        </div>

        <button className="mt-10 w-full cursor-pointer rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(59,130,246,.45)]">
          Verify OTP
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Didn't receive the code?
          <button className="ml-2 font-semibold text-blue-400 transition hover:text-cyan-400 cursor-pointer">
            Resend OTP
          </button>
        </p>

      </div>
    </div>
  );
};

export default FillOTP;