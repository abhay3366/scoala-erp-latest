import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema } from '../../schemas/auth.schema';
import { registerSchoolSchema, schoolInfoSchema } from '../../schemas/school.schema';
import LoginHeader from '../../components/LoginHeader';




// ─── Logo SVG ────────────────────────────────────────────────────────────────

const LogoIcon = () => (
  <div className="w-9 h-9 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
    </svg>
  </div>
);

// ─── Step 1: Register School ─────────────────────────────────────────────────

function StepRegisterSchool({ onNext, setRegisteredEmail }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchoolSchema),
  });

  const onSubmit = (data) => {
    setRegisteredEmail(data.email);
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7] w-full">
      {/* Header */}
      <LoginHeader/>

      {/* Main */}
      <main className="flex-1 flex justify-center items-center px-5 py-10">
        <div className="bg-white rounded-2xl pt-8 pb-6 px-12 w-full max-w-[480px] shadow-[0_4px_6px_rgba(0,0,0,0.05)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6]" />

          <div className="w-16 h-16 mx-auto mb-6 bg-[#eff6ff] rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-[#1e3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>

          <h1 className="text-center text-[28px] font-bold text-[#1a1a1a] mb-2">Register Your School</h1>
          <p className="text-center text-[#6b7280] text-sm mb-8">Start your 30-day free trial. No credit card required.</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-[#1a1a1a] mb-2">Work Email Address</label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input type="email" id="email" {...register('email')} placeholder="admin@school.edu"
                  className="w-full py-3.5 pr-4 pl-11 border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] transition-all focus:outline-none focus:border-[#1e3a8a] focus:shadow-[0_0_0_3px_rgba(30,58,138,0.1)]" />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="flex items-start gap-2 mb-6 bg-[#eff6ff] rounded-lg p-3">
              <svg className="w-4 h-4 text-[#1e3a8a] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-[#1e3a8a] leading-relaxed">We will send a One-Time Password (OTP) to this address for verification.</p>
            </div>

            <button type="submit"
              className="w-full py-4 bg-[#1e3a8a] text-white border-none rounded-lg text-[15px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 hover:bg-[#1e40af] active:scale-[0.98] mb-6">
              Send OTP
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <p className="text-center text-xs text-[#9ca3af]">
              By registering, you agree to Scoala's{' '}
              <a href="#" className="text-[#1e3a8a] hover:underline">Terms of Service</a>{' '}and{' '}
              <a href="#" className="text-[#1e3a8a] hover:underline">Privacy Policy</a>
            </p>
          </form>
        </div>
      </main>

      {/* Footer Trust Badges */}
      <footer className="flex justify-center items-center gap-8 pb-10">
        <div className="flex items-center gap-2 text-[#9ca3af] text-xs">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>SOC2 Compliant</span>
        </div>
        <div className="flex items-center gap-2 text-[#9ca3af] text-xs">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>256-bit Encryption</span>
        </div>
        <div className="flex items-center gap-2 text-[#9ca3af] text-xs">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <span>Trusted by 500+ Schools</span>
        </div>
      </footer>
    </div>
  );
}

// ─── Step 2: Verify Email (OTP) ───────────────────────────────────────────────

function StepVerifyEmail({ onNext, onBack, registeredEmail }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const { handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(otpSchema),
  });

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setValue('otp', newOtp.join(''));
    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) inputRefs.current[index - 1].focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    pastedData.split('').forEach((char, i) => { newOtp[i] = char; });
    setOtp(newOtp);
    setValue('otp', newOtp.join(''));
    inputRefs.current[Math.min(pastedData.length - 1, 5)].focus();
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setValue('otp', '');
    inputRefs.current[0].focus();
  };

  const onSubmit = () => onNext();

  return (
    <div className='w-full'>
     <LoginHeader/>
    <div className="min-h-screen flex flex-col items-center justify-center px-5 w-full"
      style={{ background: 'linear-gradient(135deg, #e8eef8 0%, #f5f7ff 40%, #e8f0fe 100%)' }}>
     
      <div className="bg-white rounded-2xl py-10 px-12 w-full max-w-[480px] shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-center gap-2 mb-8">
          <LogoIcon />
          <span className="text-xl font-semibold text-[#1a1a1a]">Scoala</span>
        </div>

        <h1 className="text-center text-[28px] font-bold text-[#1a1a1a] mb-3">Verify Your Email</h1>
        <p className="text-center text-[#6b7280] text-sm leading-relaxed mb-8">
          We've sent a 6-digit verification code to{' '}
          <span className="font-semibold text-[#1a1a1a]">{registeredEmail || 'principal@yourschool.edu'}</span>. Please enter it below.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input key={index} ref={(el) => (inputRefs.current[index] = el)}
                type="text" inputMode="numeric" maxLength={1} value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)} onPaste={handlePaste}
                className="w-12 h-12 text-center text-lg font-semibold text-[#1a1a1a] border border-[#e5e7eb] rounded-lg transition-all focus:outline-none focus:border-[#1e3a8a] focus:shadow-[0_0_0_3px_rgba(30,58,138,0.1)] bg-white" />
            ))}
          </div>
          {errors.otp && <p className="text-center mb-4 text-xs text-red-500">{errors.otp.message}</p>}

          <button type="submit"
            className="w-full py-4 bg-[#1e3a8a] text-white border-none rounded-lg text-[15px] font-semibold cursor-pointer transition-all flex items-center justify-center hover:bg-[#1e40af] active:scale-[0.98] mb-5">
            Verify Account
          </button>

          <p className="text-center text-sm text-[#6b7280]">
            Didn't receive the code?{' '}
            <button type="button" onClick={handleResend}
              className="text-[#1e3a8a] font-semibold bg-transparent border-none cursor-pointer hover:underline p-0">
              Resend
            </button>
          </p>
        </form>

        <div className="border-t border-[#f3f4f6] mt-6 pt-5">
          <div className="flex items-center justify-center gap-1.5 text-[#9ca3af] text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span>Need help?</span>
          </div>
        </div>
      </div>
      <p className="mt-6 text-xs text-[#9ca3af]">© 2024 Scoala Education Platform</p>
    </div>
    </div>
  );
}

// ─── Step 3: School Information ───────────────────────────────────────────────

function StepSchoolInformation({ onNext, onBack }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schoolInfoSchema),
    defaultValues: { countryCode: 'US (+1)', country: 'United States' },
  });

  // const stepPercent = 66;
  const onSubmit = () => onNext();

  return (
    <div className='w-full'>
    <LoginHeader />
    <div className="min-h-screen flex flex-col bg-[#f5f5f7]">
      {/* Progress Bar */}
      {/* <div className="px-10 pt-6 pb-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-[#1e3a8a]">Step 2 of 3</span>
          <span className="text-sm text-[#6b7280]">{stepPercent}% Completed</span>
        </div>
        <div className="w-full h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
          <div className="h-full bg-[#1e3a8a] rounded-full" style={{ width: `${stepPercent}%` }} />
        </div>
      </div> */}

      <main className="flex-1 flex justify-center items-start px-5 py-6">
        <div className="bg-white rounded-2xl w-full max-w-[560px] shadow-[0_4px_6px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="px-8 pt-8 pb-6 border-b border-[#f3f4f6]">
            <h1 className="text-[22px] font-bold text-[#1e3a8a] mb-1">School Information</h1>
            <p className="text-sm text-[#6b7280]">Tell us about your institution to personalize your dashboard.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6">
            {/* School Name */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Official School Name <span className="text-red-500">*</span></label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <input {...register('schoolName')} type="text" placeholder="e.g. Springfield High School"
                  className="w-full py-3.5 pr-4 pl-11 border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] transition-all focus:outline-none focus:border-[#1e3a8a] focus:shadow-[0_0_0_3px_rgba(30,58,138,0.1)]" />
              </div>
              {errors.schoolName && <p className="mt-1 text-xs text-red-500">{errors.schoolName.message}</p>}
            </div>

            {/* Mobile Number */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Mobile Number <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <div className="relative">
                  <select {...register('countryCode')}
                    className="appearance-none h-full py-3.5 pl-3 pr-8 border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a1a] bg-white transition-all focus:outline-none focus:border-[#1e3a8a] focus:shadow-[0_0_0_3px_rgba(30,58,138,0.1)] cursor-pointer">
                    <option>US (+1)</option><option>UK (+44)</option><option>IN (+91)</option>
                    <option>AU (+61)</option><option>CA (+1)</option>
                  </select>
                  <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="relative flex-1">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#1e3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <input {...register('mobileNumber')} type="tel" placeholder="(555) 000-0000"
                    className="w-full py-3.5 pr-4 pl-11 border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] transition-all focus:outline-none focus:border-[#1e3a8a] focus:shadow-[0_0_0_3px_rgba(30,58,138,0.1)]" />
                </div>
              </div>
              {errors.mobileNumber && <p className="mt-1 text-xs text-red-500">{errors.mobileNumber.message}</p>}
            </div>

            {/* Street Address */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Street Address <span className="text-red-500">*</span></label>
              <textarea {...register('streetAddress')} placeholder="Enter the full street address" rows={4}
                className="w-full py-3.5 px-4 border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] transition-all focus:outline-none focus:border-[#1e3a8a] focus:shadow-[0_0_0_3px_rgba(30,58,138,0.1)] resize-none" />
              {errors.streetAddress && <p className="mt-1 text-xs text-red-500">{errors.streetAddress.message}</p>}
            </div>

            {/* Pin / State / Country */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div>
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Pin / Zip Code</label>
                <input {...register('pinCode')} type="text" placeholder="00000"
                  className="w-full py-3.5 px-4 border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] transition-all focus:outline-none focus:border-[#1e3a8a] focus:shadow-[0_0_0_3px_rgba(30,58,138,0.1)]" />
                {errors.pinCode && <p className="mt-1 text-xs text-red-500">{errors.pinCode.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">State / Province</label>
                <div className="relative">
                  <select {...register('state')}
                    className="appearance-none w-full py-3.5 pl-4 pr-8 border border-[#e5e7eb] rounded-lg text-sm text-[#9ca3af] bg-white transition-all focus:outline-none focus:border-[#1e3a8a] focus:shadow-[0_0_0_3px_rgba(30,58,138,0.1)] cursor-pointer">
                    <option value="">Select State</option><option>California</option><option>New York</option>
                    <option>Texas</option><option>Florida</option><option>Illinois</option>
                  </select>
                  <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Country <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select {...register('country')}
                    className="appearance-none w-full py-3.5 pl-4 pr-8 border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a1a] bg-white transition-all focus:outline-none focus:border-[#1e3a8a] focus:shadow-[0_0_0_3px_rgba(30,58,138,0.1)] cursor-pointer">
                    <option>United States</option><option>United Kingdom</option>
                    <option>India</option><option>Australia</option><option>Canada</option>
                  </select>
                  <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-[#f3f4f6]">
              <button type="button" onClick={onBack}
                className="flex items-center gap-2 text-sm text-[#6b7280] bg-transparent border-none cursor-pointer hover:text-[#1e3a8a] transition-colors p-0">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
              <button type="submit"
                className="py-3 px-6 bg-[#1e3a8a] text-white border-none rounded-lg text-sm font-semibold cursor-pointer transition-all flex items-center gap-2 hover:bg-[#1e40af] active:scale-[0.98]">
                Save & Continue
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        <div className="absolute bottom-6 flex gap-6">
          <a href="#" className="text-xs text-[#9ca3af] no-underline hover:text-[#1e3a8a] transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-[#9ca3af] no-underline hover:text-[#1e3a8a] transition-colors">Terms of Service</a>
        </div>
      </main>
    </div>
    </div>
  );
}

// ─── Step 4: School Account Ready ────────────────────────────────────────────

function StepSchoolAccountReady() {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const siteUrl = 'yourschool.scoalaerp.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='w-full'>
    <LoginHeader />
    <div className="min-h-screen flex flex-col items-center justify-center px-5"
      style={{ background: 'linear-gradient(135deg, #e8eef8 0%, #f5f7ff 40%, #e8f0fe 100%)' }}>
      <div className="flex items-center gap-2 mb-8">
        <LogoIcon />
        <span className="text-xl font-semibold text-[#1a1a1a]">Scoala</span>
      </div>

      <div className="bg-white rounded-2xl py-10 px-10 w-full max-w-[480px] shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <div className="w-14 h-14 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-center text-[24px] font-bold text-[#1a1a1a] mb-2">Your School Account is Ready</h1>
        <p className="text-center text-sm text-[#1e3a8a] mb-8">Please save these credentials for future access to your dashboard.</p>

        {/* Site URL */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Your Site URL</label>
          <div className="relative">
            <input type="text" readOnly value={siteUrl}
              className="w-full py-3.5 px-4 pr-12 border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a1a] bg-white focus:outline-none" />
            <button type="button" onClick={handleCopy}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1e3a8a] hover:text-[#1e40af] transition-colors">
              {copied
                ? <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              }
            </button>
          </div>
        </div>

        {/* Username */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Username</label>
          <input type="text" readOnly value="admin@yourschool.edu"
            className="w-full py-3.5 px-4 border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a1a] bg-white focus:outline-none" />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Password</label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} readOnly value="MyStr0ng@Pass"
              className="w-full py-3.5 px-4 pr-12 border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a1a] bg-white focus:outline-none" />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showPassword
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                }
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-1 flex-1">
              {[true, true, true, false].map((filled, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full ${filled ? 'bg-green-500' : 'bg-[#e5e7eb]'}`} />
              ))}
            </div>
            <span className="text-xs font-semibold text-green-500">Strong</span>
          </div>
        </div>

        <button type="button"
          className="w-full py-4 bg-[#1e3a8a] text-white border-none rounded-lg text-[15px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 hover:bg-[#1e40af] active:scale-[0.98]">
          Go to Dashboard
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-1.5 mt-6 text-sm text-[#6b7280]">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        <span>Need help?</span>
        <a href="#" className="text-[#1e3a8a] no-underline font-medium hover:underline">Contact Support</a>
      </div>
    </div>
    </div>
  );
}

// ─── Main Multi-Step Controller ───────────────────────────────────────────────

export default function SchoolInformation() {
  const [step, setStep] = useState(1);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const goNext = () => setStep((s) => s + 1);
  const goBack = () => setStep((s) => s - 1);

  return (
    <>
      {step === 1 && <StepRegisterSchool onNext={goNext} setRegisteredEmail={setRegisteredEmail} />}
      {step === 2 && <StepVerifyEmail onNext={goNext} onBack={goBack} registeredEmail={registeredEmail} />}
      {step === 3 && <StepSchoolInformation onNext={goNext} onBack={goBack} />}
      {step === 4 && <StepSchoolAccountReady />}
    </>
  );
}