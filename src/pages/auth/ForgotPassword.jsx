import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


import LoginHeader from '../../components/LoginHeader';
import { forgotPasswordSchema } from '../../schemas/auth.schema';

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7] w-full">
      {/* Header */}
     <LoginHeader/>

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center px-5 py-10">
        <div className="bg-white rounded-2xl p-12 w-full max-w-[480px] shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 bg-[#eff6ff] rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#1e3a8a]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-center text-[28px] font-bold text-[#1a1a1a] mb-4">
            Forgot Your Password?
          </h1>

          {/* Description */}
          <p className="text-center text-[#6b7280] text-sm leading-relaxed mb-8">
            No worries! Enter your registered email address below and we'll send
            you a secure link to reset your password.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#1a1a1a] mb-2"
              >
                Registered Email
              </label>
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#9ca3af]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  placeholder="Enter your registered email"
                  className="w-full py-3.5 pr-4 pl-11 border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] transition-all focus:outline-none focus:border-[#1e3a8a] focus:shadow-[0_0_0_3px_rgba(30,58,138,0.1)]"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#1e3a8a] text-white border-none rounded-lg text-[15px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 hover:bg-[#1e40af] active:scale-[0.98]"
            >
              Send Reset Link
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </form>

          {/* Back to Login Link */}
          <a
            href="#"
            className="flex items-center justify-center gap-1.5 mt-5 text-[#6b7280] no-underline text-sm transition-colors hover:text-[#1e3a8a]"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Login
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-[#9ca3af] text-[13px]">
        <p>© 2024 Scoala ERP. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-2">
          <a
            href="#"
            className="text-[#6b7280] no-underline transition-colors hover:text-[#1e3a8a]"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-[#6b7280] no-underline transition-colors hover:text-[#1e3a8a]"
          >
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
}