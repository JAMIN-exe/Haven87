import { LogOut } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ active, onSelect, items }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-full sm:w-56 shrink-0 bg-surface border border-border rounded-xl p-3 flex sm:flex-col gap-1 h-fit">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => onSelect(item.key)}
          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
            active === item.key ? "bg-surface-alt text-accent" : "text-text-muted hover:text-text hover:bg-bg"
          }`}
        >
          <item.icon size={18} />
          {item.label}
        </button>
      ))}
      <div className="hidden sm:block mt-4 pt-4 border-t border-border">
        <p className="text-xs text-text-muted px-3 mb-2 truncate">{user?.fullName}</p>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-danger hover:bg-bg transition-colors"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
}