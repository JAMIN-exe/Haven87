import { NavLink, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, ClipboardList, PlusCircle, LogOut } from "lucide-react";
import { useAuth } from "../../context/useAuth";

const NAV_ITEMS = [
  { to: "/organizer/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/organizer/opportunities", label: "My Opportunities", icon: ClipboardList },
];

export default function OrganizerLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-300 mx-auto px-3 py-6 sm:px-4 sm:py-8 lg:px-6 lg:py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-4">
          <nav className="bg-surface border border-border rounded-xl p-2 flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive ? "bg-surface-alt text-accent" : "text-text-muted hover:text-text hover:bg-bg"
                  }`
                }
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/organizer/opportunities/new"
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap bg-accent text-white hover:bg-accent-hover transition-colors"
            >
              <PlusCircle size={18} />
              Post New Opportunity
            </Link>
          </nav>

          <div className="bg-surface border border-border rounded-xl p-4 hidden lg:block">
            <div className="flex items-center gap-1">
              <p className="text-sm font-medium text-text truncate">{user?.fullName}</p>
              <span className={`w-1.5 h-1.5 rounded-full ${user?.cacVerified ? "bg-success" : "bg-warning"}`} />
            </div>
            <p className="text-xs text-text-muted truncate">
              {user?.cacVerified ? "Verified Organizer" : "Pending Verification"}
            </p>
            <button
              onClick={handleLogout}
              className="w-full mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-danger hover:bg-bg transition-colors"
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </aside>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}