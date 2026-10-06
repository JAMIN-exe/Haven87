import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Clock,
  Compass,
  LogOut,
  Calendar,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { getMyApplications, getOpportunityById } from "../../api/api";
import { formatDateLong } from "../../utils/formatDate";
import MyApplications from "./MyApplications";
import MyParticipation from "./MyParticipation";

function getOpportunityId(application) {
  return application.opportunityId;
}

function getOrganizerName(opportunity) {
  return opportunity?.organizer?.fullName || "Organization";
}

export default function VolunteerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [opportunitiesById, setOpportunitiesById] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const res = await getMyApplications(user.id);
      if (res.success && Array.isArray(res.data)) {
        const opportunities = {};
        const idsToFetch = new Set();

        for (const application of res.data) {
          const id = getOpportunityId(application);
          if (id) idsToFetch.add(id);
        }

        await Promise.all([...idsToFetch].map(async (id) => {
          const opportunityRes = await getOpportunityById(id);
          if (opportunityRes.success) opportunities[id] = opportunityRes.data;
        }));

        if (!cancelled) {
          setApplications(res.data);
          setOpportunitiesById(opportunities);
        }
      }
      if (!cancelled) setLoading(false);
    }
    if (user) load();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const pendingCount = applications.filter((a) => a.status === "pending").length;
  const approvedApps = applications.filter((a) => a.status === "approved");

  const nextShift = useMemo(() => {
    const today = new Date();
    const upcoming = approvedApps
      .map((a) => ({ app: a, opportunity: opportunitiesById[getOpportunityId(a)] }))
      .filter((x) => x.opportunity && new Date(x.opportunity.date) >= today)
      .sort((a, b) => new Date(a.opportunity.date) - new Date(b.opportunity.date));
    return upcoming[0] || null;
  }, [approvedApps, opportunitiesById]);

  return (
    <div className="max-w-300 mx-auto px-3 py-6 sm:px-4 sm:py-8 lg:px-6 lg:py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-4">
          <nav className="bg-surface border border-border rounded-xl p-2 flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
              <span className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap bg-surface-alt text-accent">
              <ClipboardList size={18} />
              Overview & Applications
            </span>
            <Link
              to="/opportunities"
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap text-text-muted hover:text-text hover:bg-bg transition-colors"
            >
              <Compass size={18} />
              Browse Opportunities
            </Link>
          </nav>

          <div className="bg-surface border border-border rounded-xl p-4 hidden lg:block">
            <p className="text-sm font-medium text-text truncate">{user?.fullName}</p>
            <p className="text-xs text-text-muted truncate">{user?.email}</p>
            <button
              onClick={handleLogout}
              className="w-full mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-danger hover:bg-bg transition-colors"
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Welcome + stats */}
          <section className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h1 className="font-heading text-2xl font-semibold text-text sm:text-3xl">
                  Welcome back, {user?.fullName?.split(" ")[0]}
                </h1>
                  <p className="text-sm text-text-muted mt-1 sm:text-base">
                  Track your applications and see where you've made an impact.
                </p>
              </div>
              <Link
                to="/opportunities"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors shrink-0"
              >
                Find New Roles
              </Link>
            </div>

            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <StatCard label="Total Applications" value={applications.length} icon={ClipboardList} />
              <StatCard label="Pending Review" value={pendingCount} icon={Clock} />
              <StatCard label="Approved" value={approvedApps.length} icon={CheckCircle2} />
            </div>

            <div className="bg-surface rounded-xl p-4 border border-border shadow-sm flex items-start gap-3 sm:items-center sm:gap-4 sm:p-5">
              <div className="w-10 h-10 rounded-lg bg-surface-alt text-accent flex items-center justify-center shrink-0">
                <Calendar size={20} />
              </div>
              {nextShift ? (
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text">
                    Next shift: {formatDateLong(nextShift.opportunity.date)}
                  </p>
                  <p className="text-sm text-text-muted wrap-break-word">
                    {nextShift.opportunity.title} · {getOrganizerName(nextShift.opportunity)}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-text-muted">No upcoming shifts scheduled yet.</p>
              )}
            </div>
          </section>

          <MyApplications
            applications={applications}
            opportunitiesById={opportunitiesById}
            loading={loading}
          />

          <MyParticipation
            approvedApps={approvedApps}
            opportunitiesById={opportunitiesById}
          />

          {/* CTA banner */}
          <section className="bg-surface rounded-xl p-6 shadow-sm border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-surface-alt text-accent flex items-center justify-center shrink-0">
                <Compass size={20} />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-text">
                  Looking for more ways to give back?
                </h3>
                <p className="text-sm text-text-muted mt-1">
                  New opportunities are added regularly — filter by schedule, location, or cause.
                </p>
              </div>
            </div>
            <Link
              to="/opportunities"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors shrink-0"
            >
              Browse Opportunities
            </Link>
          </section>
        </div>
      </div>
    </div>
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