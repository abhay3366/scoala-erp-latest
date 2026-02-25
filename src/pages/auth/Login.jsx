import { useForm } from 'react-hook-form'
import { useAuth } from "../../context/AuthContext";
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/auth.schema';
import { FaEyeSlash, FaRegEye, FaEnvelope, FaLock } from "react-icons/fa";
import Captcha from '../../components/Captcha';
import { Link } from 'react-router-dom';

const Login = () => {
    const API = "http://localhost:2000/users"
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email_username: "",
            password: "",
            rememberMe: false
        }
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Invalid credentials. Please try again.');
            }

            login("demo-token");
            console.log("Login successful:", result);

        } catch (error) {
            setError(error.message);
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden flex-col md:flex-row">

            {/* ── Left Panel ── */}
            <div className="hidden md:flex md:w-1/2 academic-gradient relative items-center justify-center p-12 text-white">
                <div className="absolute top-10 left-10 flex items-center gap-2">
                    <div className="size-8 text-white">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">Scoala</h2>
                </div>
                <div className="max-w-md space-y-8 relative z-10">
                    <div className="rounded-xl overflow-hidden shadow-2xl">
                        <div
                            className="w-full aspect-square bg-cover bg-center"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_MMZJF_uSh5WqSqhuBaQjyvqOuFcwEpLLgE_eaGu6OY1f7tIbIhyyqOpEV-IfEbAP84nBgEnsR_Fd0vRe0mkZMHoqgmQTTjG-wkAScZX8pyTUsBPQ_LgHKz0kmRJVZVkJxkin5XKNw3puK_b4DWrTeL1Ql9vfX9nnTB5iRdt2KwVI7J587zaOmTyn_PZHysyodPxbt-l1TEEAOPpbkyD_QUIlu-G8Vg80smCndnycPgvvy-C2VNE2Dy4jZItDeo6C24k0qPzgUH0')" }}
                        />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-3xl font-black">Empowering the next generation of learners.</h3>
                        <p className="text-white/80 text-lg leading-relaxed">
                            Access your academic resources, track your progress, and stay connected with your school community in one centralized platform.
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mb-32 blur-3xl" />
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mt-32 blur-3xl" />
            </div>

            {/* ── Right Panel ── */}
            <div className="flex-1 flex flex-col justify-center items-center bg-background-light dark:bg-background-dark p-6 @container">
                <div className="w-full max-w-[480px] space-y-8">

                    {/* Mobile Logo */}
                    <div className="md:hidden flex items-center gap-3 mb-8">
                        <div className="size-8 text-primary dark:text-white">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor" />
                            </svg>
                        </div>
                        <h2 className="text-primary dark:text-white text-2xl font-bold tracking-tight">Scoala</h2>
                    </div>

                    {/* Heading */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-primary dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                            Welcome back
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base">
                            Please enter your details to access your dashboard.
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl border border-red-200 dark:border-red-800">
                            {error}
                        </p>
                    )}

                    {/* Form */}
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>

                        {/* Email Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-primary dark:text-white text-base font-medium">
                                Email or Username
                            </label>
                            <div className="relative flex items-center">
                                {/* ✅ react-icon */}
                                <FaEnvelope
                                    className="absolute left-4 text-[#4c599a] pointer-events-none"
                                    size={18}
                                />
                                <input
                                    {...register("email_username")}
                                    className="form-input w-full rounded-xl border border-[#cfd3e7] bg-white dark:bg-slate-900 text-primary dark:text-white focus:ring-2 focus:ring-primary focus:border-primary h-14 pl-12 pr-4 text-base font-normal"
                                    placeholder="accevateabhay@gmail.com"
                                    type="text"
                                />
                            </div>
                            {errors.email_username && (
                                <p className="text-red-500 text-xs mt-1 font-medium">
                                    {errors.email_username.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-primary dark:text-white text-base font-medium">
                                Password
                            </label>
                            <div className="relative flex items-center">
                                {/* ✅ react-icon */}
                                <FaLock
                                    className="absolute left-4 text-[#4c599a] pointer-events-none"
                                    size={18}
                                />
                                <input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    className="form-input w-full rounded-xl border border-[#cfd3e7] bg-white dark:bg-slate-900 text-primary dark:text-white focus:ring-2 focus:ring-primary focus:border-primary h-14 pl-12 pr-12 text-base font-normal"
                                    placeholder="Enter a password"
                                />
                                {/* ✅ react-icon */}
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 cursor-pointer text-[#4c599a] hover:text-primary transition-colors"
                                    type="button"
                                >
                                    {showPassword
                                        ? <FaEyeSlash size={18} />
                                        : <FaRegEye size={18} />
                                    }
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1 font-medium">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Captcha */}
                        <div>
                            <Captcha />
                        </div>

                        {/* Remember Me + Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-3 cursor-pointer custom-checkbox-tick">
                                <input
                                    {...register("rememberMe")}
                                    className="h-5 w-5 rounded border-[#cfd3e7] border-2 bg-transparent text-primary focus:ring-primary checked:bg-primary checked:border-primary focus:ring-offset-0 focus:outline-none"
                                    type="checkbox"
                                />
                                <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">
                                    Remember me
                                </span>
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-secondary dark:text-blue-400 text-sm font-semibold hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="btn-gradient w-full h-14 text-white rounded-xl text-lg font-bold shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-60"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20">
                            <span className="text-white text-sm">
                                Not a member?{" "}
                                <Link
                                    to="/registration"
                                    className="font-semibold text-yellow-300 hover:text-yellow-200 underline underline-offset-4 transition"
                                >
                                    Register Now
                                </Link>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;