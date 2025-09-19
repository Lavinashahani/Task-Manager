import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { useTaskStore } from "../store/taskStore.js";
import { github, logOut, profile } from "../utils/Icons.jsx";

function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const name = user?.name || "User";
  const userId = user?._id;

  const { openModalForAdd, activeTasks } = useTaskStore();
  const active = activeTasks();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  const socialLinks = [
    { icon: github, href: "https://github.com/Lavinashahani" },
    { icon: logOut, type: "logout" },
    { icon: profile, href: "https://github.com/Lavinashahani" },
  ];

  return (
    <header className="px-6 py-3 w-full flex items-center justify-between bg-[#f9f9f9] ">
      <div>
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            👋
          </span>
          {isAuthenticated && user
            ? ` Welcome, ${name}!`
            : " Welcome to Lucid Task!"}
        </h1>
        <p className="text-sm pl-8">
          {userId ? (
            <>
              You have{" "}
              <span className="font-bold  text-[#3aafae]">{active.length}</span>{" "}
              active tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>

      <div className="h-[50px] flex items-center gap-[10.4rem]">
        <button
          className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px] hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
          onClick={() => {
            if (userId) {
              openModalForAdd();
            } else {
              navigate("/login");
            }
          }}
        >
          {userId ? "Add a new Task" : "Login / Register"}
        </button>

        <div className="flex gap-4 items-center">
          {socialLinks.map((link, idx) =>
            link.type === "logout" ? (
              <button
                key={idx}
                onClick={handleLogout}
                className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
              >
                {link.icon}
              </button>
            ) : (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
              >
                {link.icon}
              </a>
            )
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
