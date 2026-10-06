import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, LogOut, XCircle } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { getOrganizers, verifyOrganizer, rejectOrganizer } from "../../api/api";

export default function AdminOrganizations() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getOrganizers();
      if (res.success) setOrganizers(res.data);
      setLoading(false);
    }
    load();
  }, []);

  const handleVerify = async (userId) => {
    setUpdatingId(userId);
    const res = await verifyOrganizer(userId);
    setUpdatingId(null);
    if (res.success) {
      setOrganizers((prev) =>
        prev.map((o) => (o.id === userId ? { ...o, cacVerified: true } : o))
      );
    }
  };

  const handleReject = async (userId) => {
    setUpdatingId(userId);
    const res = await rejectOrganizer(userId);
    setUpdatingId(null);
    if (res.success) {
      setOrganizers((prev) => prev.filter((organizer) => organizer.id !== userId));
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-225 mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-text">Organizations</h1>
          <p className="text-text-muted mt-1">Review and verify organizer CAC registration numbers.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-alt hover:bg-border text-text text-sm font-medium transition-colors"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-text-muted">Loading...</p>
      ) : organizers.length === 0 ? (
        <div className="bg-surface rounded-xl border border-border p-10 text-center">
          <p className="text-text-muted text-sm">No organizations registered yet.</p>
        </div>
      ) : (
        <div className="bg-surface rounded-xl border border-border divide-y divide-border">
          {organizers.map((org) => (
            <div key={org.id} className="p-4 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-medium text-text">{org.fullName}</p>
                <p className="text-sm text-text-muted">{org.email}</p>
                {org.cacNumber && (
                  <p className="text-xs text-text-muted mt-0.5">CAC: {org.cacNumber}</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                    org.cacVerified ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${org.cacVerified ? "bg-success" : "bg-warning"}`} />
                  {org.cacVerified ? "Verified Organizer" : "Pending Verification"}
                </span>

                {!org.cacVerified && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVerify(org.id)}
                      disabled={updatingId === org.id}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors disabled:opacity-70"
                    >
                      <ShieldCheck size={16} />
                      {updatingId === org.id ? "Working..." : "Verify"}
                    </button>
                    <button
                      onClick={() => handleReject(org.id)}
                      disabled={updatingId === org.id}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-danger/10 hover:bg-danger/20 text-danger text-sm font-medium transition-colors disabled:opacity-70"
                    >
                      <XCircle size={16} />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}