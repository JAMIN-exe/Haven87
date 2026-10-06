import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipboardList, Users, Clock } from "lucide-react";
import OrganizerLayout from "../../components/layout/OrganizerLayout";
import { useAuth } from "../../context/useAuth";
import { getOpportunities, getOpportunityApplications } from "../../api/mockApi";

export default function OrganizerDashboard() {
  const { user } = useAuth();
  const [myOpportunities, setMyOpportunities] = useState([]);
  const [applicantCounts, setApplicantCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const oppRes = await getOpportunities({ limit: 100 });
      const myOpps = oppRes.success
        ? oppRes.data.items.filter((o) => o.organizerId === user.id)
        : [];
      setMyOpportunities(myOpps);

      const counts = {};
      let pending = 0;
      for (const opp of myOpps) {
        const res = await getOpportunityApplications(opp.id);
        if (res.success) {
          counts[opp.id] = res.data.length;
          pending += res.data.filter((a) => a.status === "pending").length;
        }
      }
      setApplicantCounts({ byOpportunity: counts, pending });
      setLoading(false);
    }
    if (user) load();
  }, [user]);

  const totalApplicants = Object.values(applicantCounts.byOpportunity || {}).reduce((a, b) => a + b, 0);

  return (
    <OrganizerLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-text">
            Welcome back, {user?.fullName}
          </h1>
          <p className="text-text-muted mt-1">Here's how your opportunities are doing.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Opportunities Posted" value={myOpportunities.length} icon={ClipboardList} />
          <StatCard label="Total Applicants" value={loading ? "..." : totalApplicants} icon={Users} />
          <StatCard label="Pending Review" value={loading ? "..." : applicantCounts.pending || 0} icon={Clock} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-xl font-semibold text-text">Your Opportunities</h2>
            <Link to="/organizer/opportunities" className="text-accent hover:text-accent-hover text-sm font-medium transition-colors">
              Manage all
            </Link>
          </div>

          {myOpportunities.length === 0 ? (
            <div className="bg-surface rounded-xl border border-border p-10 text-center">
              <p className="text-text-muted text-sm">You haven't posted any opportunities yet.</p>
              <Link to="/organizer/opportunities/new" className="text-accent hover:underline text-sm mt-2 inline-block">
                Post your first opportunity
              </Link>
            </div>
          ) : (
            <div className="bg-surface rounded-xl border border-border divide-y divide-border">
              {myOpportunities.map((opp) => (
                <div key={opp.id} className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-text">{opp.title}</p>
                    <p className="text-sm text-text-muted">
                      {opp.location} · {opp.spotsAvailable} {opp.spotsAvailable === 1 ? "spot" : "spots"} remaining
                    </p>
                  </div>
                  <Link
                    to={`/organizer/opportunities/${opp.id}/applicants`}
                    className="text-sm font-medium text-accent hover:text-accent-hover transition-colors shrink-0"
                  >
                    {loading ? "..." : applicantCounts.byOpportunity?.[opp.id] || 0} applicants
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </OrganizerLayout>
  );
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="bg-surface rounded-xl p-5 border border-border shadow-sm flex items-start justify-between">
      <div>
        <p className="text-2xl font-semibold text-text">{value}</p>
        <p className="text-sm text-text-muted mt-1">{label}</p>
      </div>
      <div className="w-9 h-9 rounded-lg bg-surface-alt text-accent flex items-center justify-center">
        <Icon size={18} />
      </div>
    </div>
  );
}