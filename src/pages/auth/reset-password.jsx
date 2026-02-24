import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


import { setNewPasswordSchema } from '../../schemas/auth.schema';
import LoginHeader from '../../components/LoginHeader';





export default function SetNewPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(setNewPasswordSchema),
  });

  const newPassword = watch('newPassword', '');

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = calculatePasswordStrength(newPassword);

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 2) return 'WEAK';
    if (passwordStrength === 3) return 'MEDIUM';
    return 'STRONG';
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    return 'bg-[#1e3a8a]';
  };

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7] w-full">
      {/* Header */}
    <LoginHeader />

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
            Set New Password
          </h1>

          {/* Description */}
          <p className="text-center text-[#6b7280] text-sm leading-relaxed mb-8">
            Create a strong password to secure your account for the academic session.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* New Password Input */}
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-sm font-semibold text-[#1a1a1a] mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  {...register('newPassword')}
                  placeholder="Enter new password"
                  className="w-full py-3.5 px-4 pr-12 border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] transition-all focus:outline-none focus:border-[#1e3a8a] focus:shadow-[0_0_0_3px_rgba(30,58,138,0.1)]"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showNewPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    )}
                  </svg>
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.newPassword.message}</p>
              )}
            </div>

            {/* Password Strength Indicator */}
            {newPassword && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-[#1a1a1a]">
                    Password Strength
                  </span>
                  <span className="text-xs font-semibold text-[#1e3a8a]">
                    {getStrengthLabel()}
                  </span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className={`h-1 flex-1 rounded-full ${
                        index <= passwordStrength
                          ? getStrengthColor()
                          : 'bg-[#e5e7eb]'
                      }`}
                    />
                  ))}
                </div>
                {passwordStrength >= 4 && (
                  <div className="flex items-center gap-2 mt-2">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs text-[#6b7280]">
                      Excellent! Use symbols and numbers for maximum security.
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Confirm Password Input */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-[#1a1a1a] mb-2"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  {...register('confirmPassword')}
                  placeholder="Repeat new password"
                  className="w-full py-3.5 px-4 pr-12 border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] transition-all focus:outline-none focus:border-[#1e3a8a] focus:shadow-[0_0_0_3px_rgba(30,58,138,0.1)]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showConfirmPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    )}
                  </svg>
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#1e3a8a] text-white border-none rounded-lg text-[15px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 hover:bg-[#1e40af] active:scale-[0.98]"
            >
              Reset Password
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