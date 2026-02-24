import React, { useState, useEffect } from 'react';
import { FiRotateCw, FiCheckCircle, FiXCircle, FiLock } from "react-icons/fi";

const Captcha = () => {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isValid, setIsValid] = useState(null);

  const generateRandom = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput("");
    setIsValid(null);
  };

  useEffect(() => {
    generateRandom();
  }, []);

  const handleVerify = (e) => {
    const val = e.target.value.toUpperCase();
    setUserInput(val);
    if (val.length === 5) {
      setIsValid(val === captchaText);
    } else {
      setIsValid(null);
    }
  };

  return (
    <>
    
        <label className="text-primary dark:text-white text-base font-medium">Security Check</label>
    <div className="max-w-[500px] p-2 bg-white rounded-xl mt-2">
      {/* Tiny Header Label */}
      <div className="flex items-center gap-1.5  px-0.5">
       
       
        {isValid === true && (
          <span className="ml-auto text-[10px] font-bold text-green-600 flex items-center gap-1">
            <FiCheckCircle size={10} /> VERIFIED
          </span>
        )}
      </div>

      <div className="flex items-stretch gap-2">
        {/* Captcha Image Simulation */}
        <div className="relative w-24 h-9 flex items-center justify-center bg-slate-100 rounded border border-slate-200 overflow-hidden select-none shrink-0 group">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <span className="relative text-sm font-black italic tracking-widest text-slate-700 -skew-x-12">
            {captchaText}
          </span>
          {/* Refresh Overlay on Hover */}
          <button
            type="button"
            onClick={generateRandom}
            className="absolute inset-0 flex items-center justify-center bg-slate-800/10 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]"
            title="Refresh code"
          >
            <FiRotateCw size={14} className="text-slate-700" />
          </button>
        </div>

        {/* Input Field */}
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={5}
            placeholder="Type code"
            value={userInput}
            onChange={handleVerify}
            className={`w-full h-9 px-3 text-sm font-bold border rounded outline-none transition-all ${
              isValid === true ? 'border-green-500 bg-green-50/30' : 
              isValid === false ? 'border-red-400 bg-red-50/30' : 
              'border-slate-300 focus:border-blue-500'
            }`}
          />
          
          {/* Status Icon */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
             {isValid === false && <FiXCircle className="text-red-500 animate-pulse" size={14} />}
          </div>
        </div>
      </div>
      
      {/* Error text (Minimal) */}
      {isValid === false && (
        <p className="text-[10px] text-red-500 mt-1 font-semibold">Code does not match.</p>
      )}
    </div>
    </>
  );
};

export default Captcha;