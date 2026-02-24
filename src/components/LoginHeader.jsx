const LoginHeader=()=>{
    return (
          <header className="flex justify-between items-center px-10 py-5 bg-white bg">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1e3a8a] rounded-md flex items-center justify-center text-white font-bold text-lg">
            L
          </div>
          <span className="text-xl font-semibold text-[#1a1a1a]">Scoala</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#6b7280]">Need help?</span>
          <a
            href="#"
            className="text-[#1e3a8a] no-underline text-sm font-medium px-4 py-2 border border-[#1e3a8a] rounded-md transition-all hover:bg-[#1e3a8a] hover:text-white"
          >
            Support
          </a>
        </div>
      </header>
    )
}
export default LoginHeader;