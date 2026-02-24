import { FiMoon, FiSun, FiSearch, FiBell, FiChevronDown } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

function Header({ isSidebarOpen, setIsSidebarOpen }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a2632] px-6 py-4 flex-shrink-0 z-10">
      
      {/* Left - Menu Toggle + Title */}
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-300"
        >
          <span className="material-symbols-outlined">
            {isSidebarOpen ? "close" : "menu"}
          </span>
        </button>

        {/* Title */}
        <div className="hidden sm:flex flex-col">
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
            Admin Dashboard
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Welcome back, Administrator
          </p>
        </div>
      </div>

      {/* Right - Search + Icons + User */}
      <div className="flex items-center gap-3">

        {/* Search Bar - hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-full px-4 h-10 w-72">
          <FiSearch className="text-slate-400 flex-shrink-0" size={16} />
          <input
            type="text"
            placeholder="Search students, fees, etc..."
            className="bg-transparent border-none outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 w-full focus:ring-0"
          />
        </div>

        {/* Mobile Search Icon */}
        <button className="md:hidden flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
          <FiSearch size={18} />
        </button>

        {/* Notification Bell */}
        <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 relative">
          <FiBell size={18} />
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a2632]"></span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
        >
          {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

        {/* User Profile */}
        <button className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 p-1 pl-2 pr-3 rounded-full transition-colors">
          {/* Avatar */}
          <div
            className="size-8 rounded-full bg-slate-200 bg-center bg-cover flex-shrink-0"
            style={{
              backgroundImage:
                "url('https://i.pravatar.cc/40?img=12')",
            }}
          />
          {/* Name + Role */}
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-tight">
              Admin
            </span>
            <span className="text-xs text-slate-400 leading-tight">User</span>
          </div>
          {/* Chevron */}
          <FiChevronDown className="hidden lg:block text-slate-400" size={16} />
        </button>

      </div>
    </header>
  );
}

export default Header;