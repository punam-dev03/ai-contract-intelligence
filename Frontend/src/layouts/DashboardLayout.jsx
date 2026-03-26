import { Outlet, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/api";

const SidebarItem = ({ icon, label, collapsed, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 px-4 py-3 hover:bg-blue-50 dark:hover:bg-slate-700 transition"
    >
      <span className="text-lg w-6 text-center">{icon}</span>

      {!collapsed && (
        <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">
          {label}
        </span>
      )}
    </button>
  );
};

const DashboardLayout = () => {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  // 🌙 Dark Mode
  useEffect(() => {

    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

  }, [darkMode]);
  useEffect(() => {

  const fetchUser = async () => {

    try {

      const res = await API.get("/users/me");

      setUser(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  fetchUser();

}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {

      await API.post("/contracts/upload", formData);
      navigate("/dashboard/contracts");

    } catch (err) {

      console.log(err);
      alert("Upload Failed");

    }

  };

  return (

    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-900 transition-colors duration-300">

      {/* SIDEBAR */}

      <motion.div
        animate={{ width: collapsed ? 80 : 240 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-slate-800 shadow-xl flex flex-col"
      >

        {/* Logo */}

        <div className="flex items-center justify-between px-4 py-6 border-b dark:border-slate-700">

          {!collapsed && (
            <h1 className="text-lg font-bold text-blue-600 whitespace-nowrap">
              AI Intelligence
            </h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 hover:text-blue-600 text-xl"
          >
            ☰
          </button>

        </div>

        {/* Navigation */}

        <div className="flex flex-col flex-1 mt-4">

          <SidebarItem
            icon="📊"
            label="Dashboard"
            collapsed={collapsed}
            onClick={() => navigate("/dashboard")}
          />

          <SidebarItem
            icon="📁"
            label="Contracts"
            collapsed={collapsed}
            onClick={() => navigate("/dashboard/contracts")}
          />

          <SidebarItem
            icon="💳"
            label="Pricing"
            collapsed={collapsed}
            onClick={() => navigate("/dashboard/pricing")}
          />

          <SidebarItem
            icon="⬆️"
            label="Upload"
            collapsed={collapsed}
            onClick={() =>
              document.getElementById("hiddenFileInput").click()
            }
          />

          <SidebarItem
            icon="⚖️"
            label="Compare"
            collapsed={collapsed}
            onClick={() => navigate("/dashboard/compare")}
          />


        </div>

        {/* Logout */}

        <div className="px-4 py-4 border-t dark:border-slate-700">

          <button
            onClick={handleLogout}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {!collapsed ? "Logout" : "⏻"}
          </button>

        </div>

      </motion.div>

      {/* MAIN */}

      <div className="flex-1 p-10">

        {/* TOP BAR */}

        <div className="flex justify-between items-center mb-10">

          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h2>

          <div className="flex items-center gap-4">

            {/* Dark Mode */}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-200 dark:bg-slate-700 px-3 py-1 rounded text-sm"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>

            {/* PROFILE */}

            <div className="relative">

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg shadow hover:shadow-md transition"
              >

                <img
                  src="https://i.pravatar.cc/40"
                  className="w-8 h-8 rounded-full"
                />

                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Account
                </span>

              </button>

              {/* DROPDOWN */}

              <AnimatePresence>

                {profileOpen && (

                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border dark:border-slate-700 overflow-hidden"
                  >

                    {/* USER INFO */}

                    <div className="px-4 py-4 border-b dark:border-slate-700">

                      <div className="flex items-center gap-3">

                        <img
                          src="https://i.pravatar.cc/40"
                          className="w-10 h-10 rounded-full"
                        />

                        <div>

                          <img
                            src={`https://ui-avatars.com/api/?name=${user?.name || "User"}&background=2563eb&color=fff`}
                            className="w-10 h-10 rounded-full"
                          />

                          <p className="text-xs text-gray-500">
                            AI Contract User
                          </p>

                        </div>

                      </div>

                    </div>
                    <Link 
                      to="/dashboard/profile"
                        onClick={() => setProfileOpen(false)}

                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                      👤 My Profile
                    </Link>

                    <Link
                      to="/dashboard/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                      ⚙️ Account Settings
                    </Link>

                    <Link
                      to="/dashboard/analytics"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                      📊 Analytics
                    </Link>

                    <div className="border-t dark:border-slate-700"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500"
                    >
                      🚪 Logout
                    </button>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

          </div>

        </div>

        {/* Hidden Upload */}

        <input
          type="file"
          accept=".pdf"
          id="hiddenFileInput"
          style={{ display: "none" }}
          onChange={handleUpload}
        />

        {/* PAGE */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>

      </div>

    </div>

  );

};

export default DashboardLayout;