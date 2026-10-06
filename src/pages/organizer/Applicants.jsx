import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";
import OrganizerLayout from "../../components/layout/OrganizerLayout";
import Badge from "../../components/ui/Badge";
import { getOpportunityById, getOpportunityApplications, updateApplicationStatus } from "../../api/api";

export default function Applicants() {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [oppRes, appsRes] = await Promise.all([
        getOpportunityById(id),
        getOpportunityApplications(id),
      ]);
      if (oppRes.success) setOpportunity(oppRes.data);
      if (appsRes.success) setApplicants(appsRes.data);
      setLoading(false);
    }
    load();
  }, [id]);

  const handleUpdate = async (applicationId, status) => {
    setUpdatingId(applicationId);
    const res = await updateApplicationStatus(applicationId, status);
    setUpdatingId(null);
    if (res.success) {
      setApplicants((prev) => prev.map((a) => (a.id === applicationId ? { ...a, status } : a)));
    }
  };

  return (
    <OrganizerLayout>
      <div className="flex flex-col gap-6">
        <div>
          <Link to="/organizer/opportunities" className="text-sm text-text-muted hover:text-text transition-colors">
            ← Back to My Opportunities
          </Link>
          <h1 className="font-heading text-2xl font-semibold text-text mt-2">
            Applicants{opportunity ? ` — ${opportunity.title}` : ""}
          </h1>
        </div>

        {loading ? (
          <p className="text-text-muted">Loading...</p>
        ) : applicants.length === 0 ? (
          <div className="bg-surface rounded-xl border border-border p-10 text-center">
            <p className="text-text-muted text-sm">No applicants yet — share this opportunity to get your first sign-up.</p>
          </div>
        ) : (
          <div className="bg-surface rounded-xl border border-border divide-y divide-border">
            {applicants.map((app) => (
              <div key={app.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-text">
                    {app.volunteerId?.fullName || app.volunteerName || "Volunteer"}
                  </p>
                  {app.appliedAt && (
                    <p className="text-sm text-text-muted">
                      Applied {new Date(app.appliedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Badge status={app.status} />
                  {app.status === "pending" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdate(app.id, "approved")}
                        disabled={updatingId === app.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success/10 hover:bg-success/20 text-success text-sm font-medium transition-colors disabled:opacity-60"
                      >
                        <CheckCircle2 size={16} />
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdate(app.id, "rejected")}
                        disabled={updatingId === app.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-danger/10 hover:bg-danger/20 text-danger text-sm font-medium transition-colors disabled:opacity-60"
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
    </OrganizerLayout>
  );
}