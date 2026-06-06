import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const dropdownRef = useRef(null);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage");
      }
    } else {
      setUser(null);
    }
  }, [location]);

   useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setShowUserMenu(false);
    navigate("/login");
  };

  const desktopLinkStyle = (isActive) =>
   `text-[14px] font-medium px-4 py-2 rounded-lg transition-all text-left bg-transparent border-none cursor-pointer block w-full ${
     isActive
       ? "text-[#4f46e5] bg-[#f5f3ff]"
       : "text-slate-900 hover:text-[#4f46e5]"
   }`;

  const mobileLinkStyle = (isActive) =>
    `text-[15px] font-medium p-3 rounded-xl w-full transition-colors block text-left bg-transparent border-none cursor-pointer ${
      isActive
        ? "text-[#4f46e5] bg-[#f5f3ff]"
        : "text-slate-900 hover:text-[#4f46e5]"
    }`;

  const handleDashboardRedirect = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/dashboard" : "/login");
    setIsOpen(false);
  };

  return (
    <nav
      ref={dropdownRef}
      className="w-full h-[76px] bg-white backdrop-blur-xl border-b border-slate-100 flex justify-center fixed top-0 left-0 z-50 font-['Inter'] transition-all duration-300"
    >
      <div className="w-full max-w-[1280px] px-6 flex justify-between items-center">
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          onClick={() => navigate("/")}
        >
          <img
            src="/F.png"
            alt="FinMatrix Icon"
            className="h-[52px] w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-[28px] font-extrabold tracking-tight bg-gradient-to-r from-[#4f46e5] via-[#3b82f6] to-[#10b981] bg-clip-text text-transparent">
            FinMatrix
          </span>
        </div>

        <ul className="hidden lg:flex items-center gap-2 text-black dark:text-white">
          <li>
            <Link
              to="/"
              className={desktopLinkStyle(location.pathname === "/")}
            >
              Home
            </Link>
          </li>
          <li>
            <button
              onClick={handleDashboardRedirect}
              className={desktopLinkStyle(
                location.pathname.startsWith("/dashboard"),
              )}
            >
              Dashboard
            </button>
          </li>
          <li>
            <Link
              to="/features"
              className={desktopLinkStyle(location.pathname === "/features")}
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={desktopLinkStyle(location.pathname === "/about")}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={mobileLinkStyle(location.pathname === "/contact")}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Right Side Controls hidden setIsOpen*/}
        <div className="flex items-center gap-4">
          {/* Auth Controls (Desktop) */}
          <div className="flex items-center gap-3">
            {" "}
            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 focus:outline-none bg-transparent p-1 pr-2 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#4f46e5] to-[#3b82f6] text-white font-black text-[15px] flex items-center justify-center shadow-sm select-none">
                    {(
                      user?.username ||
                      user?.name ||
                      user?.displayName ||
                      "User"
                    )
                      .trim()
                      .charAt(0)
                      .toUpperCase()}{" "}
                  </div>

                  <span className="text-[13px] font-bold text-slate-700 max-w-[90px] truncate hover:text-[#4f46e5] transition-colors">
                    {(user?.name || "User").split(" ")[0]}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-slate-50 dark:border-slate-700 mb-1">
                      <p className="text-[11px] font-medium text-slate-400 truncate">
                        Logged in as
                      </p>
                      <p className="text-[12px] font-bold text-slate-700 dark:text-slate-200 truncate">
                        {user.email || "No Email"}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors text-left"
                    >
                      <LogOut size={14} /> Logout Session
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-[14px] font-semibold text-slate-600 dark:text-slate-300 hover:text-[#4f46e5] px-4 py-2 rounded-lg transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="text-[14px] font-semibold text-white bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#4f46e5] hover:to-[#4338ca] px-5 py-2.5 rounded-xl shadow-md shadow-indigo-200 dark:shadow-indigo-900/30 hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {!location.pathname.startsWith("/dashboard") && (
            <button
              className="lg:hidden p-1 text-slate-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      <div
        className={`fixed top-[76px] left-0 w-[280px] h-[calc(100vh-76px)] bg-white border-r border-slate-100 shadow-2xl p-6 flex flex-col gap-3 lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className={mobileLinkStyle(location.pathname === "/")}
        >
          Home
        </Link>
        <button
          onClick={handleDashboardRedirect}
          className={mobileLinkStyle(
            location.pathname.startsWith("/dashboard"),
          )}
        >
          Dashboard
        </button>
        <Link
          to="/features"
          onClick={() => setIsOpen(false)}
          className={mobileLinkStyle(location.pathname === "/features")}
        >
          Features
        </Link>
        <Link
          to="/about"
          onClick={() => setIsOpen(false)}
          className={mobileLinkStyle(location.pathname === "/about")}
        >
          About
        </Link>
        <a
          href="#contact"
          onClick={() => setIsOpen(false)}
          className={mobileLinkStyle(location.hash === "#contact")}
        >
          Contact
        </a>

        <div className="h-px bg-slate-100 my-2"></div>
        {user ? (
          <div className="flex flex-col gap-2">
            <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#4f46e5] to-[#3b82f6] text-white font-bold flex items-center justify-center">
                {(user.username || user.name || user.displayName || "User")
                  .trim()
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <p className="text-[11px] text-slate-400">User</p>
                <p className="text-[14px] font-bold text-slate-700">
                  {
                    (
                      user.username ||
                      user.name ||
                      user.displayName ||
                      "User"
                    ).split(" ")[0]
                  }{" "}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full py-3 text-[14px] font-semibold text-rose-500 bg-rose-50 dark:bg-rose-500/10 rounded-xl transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
              className="w-full py-3 text-[14px] font-semibold text-slate-600 dark:text-slate-300 rounded-xl"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/signup");
                setIsOpen(false);
              }}
              className="w-full py-3 text-[14px] font-semibold text-white bg-gradient-to-r from-[#6366f1] to-[#4f46e5] rounded-xl shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20"
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
