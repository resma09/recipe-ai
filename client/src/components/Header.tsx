import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-[#111210] border-b border-gray-200 dark:border-white/[0.07] sticky top-0 z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">

        <Link
          to="/"
          className="font-['Instrument_Serif'] text-[20px] text-gray-900 dark:text-[#f0efe8] tracking-[-0.2px] leading-none"
        >
          Recipe<span className="text-[#4a5c2f] dark:text-[#8aab5c] italic">AI</span>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="flex gap-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-full text-[12.5px] border transition-all ${isActive
                  ? "bg-[#4a5c2f] dark:bg-[#8aab5c] border-[#4a5c2f] dark:border-[#8aab5c] text-white dark:text-[#111210] font-medium"
                  : "bg-transparent border-gray-200 dark:border-white/10 text-gray-500 dark:text-[#555] hover:border-gray-300 dark:hover:border-white/20 hover:text-gray-700 dark:hover:text-[#888]"
                }`
              }
            >
              Generate
            </NavLink>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-full text-[12.5px] border transition-all ${isActive
                  ? "bg-[#4a5c2f] dark:bg-[#8aab5c] border-[#4a5c2f] dark:border-[#8aab5c] text-white dark:text-[#111210] font-medium"
                  : "bg-transparent border-gray-200 dark:border-white/10 text-gray-500 dark:text-[#555] hover:border-gray-300 dark:hover:border-white/20 hover:text-gray-700 dark:hover:text-[#888]"
                }`
              }
            >
              Gallery
            </NavLink>
          </nav>

          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[14px] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

      </div>
    </header>
  );
}