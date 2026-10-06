import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Users } from "lucide-react";
import OrganizerLayout from "../../components/layout/OrganizerLayout";
import { useAuth } from "../../context/useAuth";
import { getOpportunities, deleteOpportunity } from "../../api/mockApi";

export default function MyOpportunities() {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getOpportunities({ limit: 100 });
      if (res.success) {
        setOpportunities(res.data.items.filter((o) => o.organizerId === user.id));
      }
      setLoading(false);
    }
    if (user) load();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this opportunity? This can't be undone.")) return;
    const res = await deleteOpportunity(id);
    if (res.success) {
      setOpportunities((prev) => prev.filter((o) => o.id !== id));
    }
  };

  return (
    <OrganizerLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-text">My Opportunities</h1>
            <p className="text-text-muted mt-1">Manage the roles you've posted.</p>
          </div>
          <Link
            to="/organizer/opportunities/new"
            className="inline-flex items-center px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
          >
            Post New
          </Link>
        </div>

        {loading ? (
          <p className="text-text-muted">Loading...</p>
        ) : opportunities.length === 0 ? (
          <div className="bg-surface rounded-xl border border-border p-10 text-center">
            <p className="text-text-muted text-sm">You haven't posted any opportunities yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-surface rounded-xl border border-border shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-text">{opp.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-surface-alt text-text-muted font-medium">
                      {opp.category}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted">
                    {opp.location} · {opp.spotsAvailable} {opp.spotsAvailable === 1 ? "spot" : "spots"} remaining
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/organizer/opportunities/${opp.id}/applicants`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-alt hover:bg-border text-text text-sm font-medium transition-colors"
                  >
                    <Users size={16} />
                    Applicants
                  </Link>
                  <Link
                    to={`/organizer/opportunities/${opp.id}/edit`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-alt hover:bg-border text-text text-sm font-medium transition-colors"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(opp.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-danger/10 hover:bg-danger/20 text-danger text-sm font-medium transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </OrganizerLayout>
  );
}