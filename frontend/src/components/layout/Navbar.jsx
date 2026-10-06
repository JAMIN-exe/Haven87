import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { User } from "lucide-react";
import { useAuth } from "../../context/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isOnLanding = location.pathname === "/";

  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      const scrolledPastThreshold = currentY > 80;
      const scrollingDown = currentY > lastScrollY.current;

      setHidden(scrollingDown && scrolledPastThreshold);
      lastScrollY.current = currentY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const scrollOrNavigate = (sectionId, fallbackPath) => (e) => {
    e.preventDefault();
    if (isOnLanding) {
      navigate(`/#${sectionId}`, { replace: true });
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(fallbackPath);
    }
  };

  const dashboardPath =
    user?.role === "volunteer" ? "/volunteer/dashboard" :
    user?.role === "organizer" ? "/organizer/dashboard" :
    user?.role === "admin" ? "/admin" : "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-bg border-b border-border transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="h-16 max-w-300 mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className={`font-heading text-lg font-semibold ${isOnLanding && !location.hash ? "text-accent" : "text-text"}`}>
            Haven 87
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/opportunities"
            onClick={scrollOrNavigate("opportunities", "/opportunities")}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive || (isOnLanding && location.hash === "#opportunities")
                  ? "text-accent"
                  : "text-text-muted hover:text-text"
              }`
            }
          >
            Opportunities
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? "text-accent" : "text-text-muted hover:text-text"}`
            }
          >
            About
          </NavLink>

          <a
            href="/#how-it-works"
            onClick={scrollOrNavigate("how-it-works", "/#how-it-works")}
            className={`text-sm font-medium transition-colors ${
              isOnLanding && location.hash === "#how-it-works"
                ? "text-accent"
                : "text-text-muted hover:text-text"
            }`}
          >
            How It Works
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <NavLink
                to={dashboardPath}
                className={({ isActive }) =>
                  `hidden sm:inline-block text-sm font-medium transition-colors ${isActive ? "text-accent" : "text-text-muted hover:text-text"}`
                }
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center bg-surface border border-border text-text text-sm font-medium px-4 py-2 rounded-md hover:bg-bg transition-colors"
              >
                Log out
              </button>
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <User size={16} className="text-accent" />
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hidden sm:inline-block text-sm font-medium transition-colors ${isActive ? "text-accent" : "text-text-muted hover:text-text"}`
                }
              >
                Log in
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `hidden sm:inline-flex items-center justify-center bg-surface border text-sm font-medium px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "border-accent text-accent"
                      : "border-border text-text hover:bg-bg"
                  }`
                }
              >
                Register
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `inline-flex items-center justify-center text-sm font-medium px-4 py-2 rounded-md transition-colors ${
                    isActive ? "bg-accent-hover text-white" : "bg-accent text-white hover:bg-accent-hover"
                  }`
                }
              >
                Join as Volunteer
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}