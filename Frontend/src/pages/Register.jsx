import React, { useRef, useState } from "react";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
    MessageCircle,
    User,
    Mail,
    Lock,
    Image,
    Eye,
    EyeOff,
} from "lucide-react";

const Register = () => {
    const navigate = useNavigate();

    const fullnameref = useRef(null)
    const emailref = useRef(null)
    const passwordref = useRef(null)
    const profileref = useRef(null)

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
        profile: "",
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
                `${import.meta.env.VITE_BASE_URL}/user/register`,
                form
            );

            if (res.data.success) {
                toast.success(res.data.message);

                localStorage.setItem("verifyEmail", form.email);

                window.scrollTo({ top: 0, behavior: "smooth" });

                navigate("/otp");

                window.scrollTo({ top: 0, behavior: "smooth" });
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
                    Create Account
                </h1>

                <p className="mt-2 text-center text-gray-400">
                    Join <span className="font-semibold text-blue-400">Convey</span> and
                    start chatting instantly.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                    <div className="relative">
                        <User
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        />

                        <input
                            type="text"
                            name="fullname"
                            placeholder="Full Name"
                            value={form.fullname}
                            onChange={handleChange}
                            required
                            ref={fullnameref}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault()
                                    emailref.current.focus()
                                }
                            }}
                            className="w-full rounded-xl border border-gray-700 bg-[#111827]/80 py-4 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                        />
                    </div>

                    <div className="relative">
                        <Mail
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleChange}
                            required
                            ref={emailref}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault()
                                    passwordref.current.focus()
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
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            ref={passwordref}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault()
                                    profileref.current.focus()
                                }
                            }}
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

                    <div className="relative">
                        <Image
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        />

                        <input
                            type="text"
                            name="profile"
                            placeholder="Profile Image URL (Optional)"
                            value={form.profile}
                            onChange={handleChange}
                            ref={profileref}
                            // onKeyDown={(e) => {
                            //     if (e.key === "Enter") {
                            //         handleSubmit(e)
                            //     }
                            // }}
                            className="w-full rounded-xl border border-gray-700 bg-[#111827]/80 py-4 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(59,130,246,.45)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Creating Account.." : "Create Account"}
                    </button>

                </form>

                <div className="my-7 flex items-center">
                    <div className="h-px flex-1 bg-gray-700"></div>
                    <span className="mx-4 text-sm text-gray-500">OR</span>
                    <div className="h-px flex-1 bg-gray-700"></div>
                </div>

                <button
                    type="button"
                    className="flex cursor-pointer w-full items-center rounded-xl border border-gray-700 bg-[#111827]/80 text-white transition-all duration-300 hover:border-blue-500 hover:bg-[#1f2937]"
                >
                    <div className="flex h-14 w-14 items-center justify-center border-r border-gray-700">
                        <FaGoogle className="text-xl text-red-500" />
                    </div>

                    <span className="flex-1 text-center font-medium tracking-wide mr-7">
                        Continue with Google
                    </span>
                </button>

                <p className="mt-8 text-center text-gray-400">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="font-semibold text-blue-400 transition hover:text-cyan-400"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Register;