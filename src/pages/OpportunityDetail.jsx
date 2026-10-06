import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  Calendar,
  Users,
  CheckCircle2,
  Share2,
  ArrowLeft,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/useAuth";
import { getOpportunityById, getMyApplications, applyToOpportunity } from "../api/mockApi";
import { mockUsers, mockOpportunities } from "../api/mockData";
import OpportunityCard from "../components/opportunities/OpportunityCard";
import { getOpportunityImage } from "../utils/opportunityImage";
import { formatDate } from "../utils/formatDate";

export default function OpportunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getOpportunityById(id);
      if (res.success) setOpportunity(res.data);

      if (user?.role === "volunteer") {
        const appsRes = await getMyApplications(user.id);
        if (appsRes.success) {
          setAlreadyApplied(appsRes.data.some((a) => a.opportunityId === id));
        }
      }
      setLoading(false);
    }
    load();
  }, [id, user]);

  const handleApply = async () => {
    setError("");
    setApplying(true);
    const res = await applyToOpportunity(opportunity.id, user.id, user.fullName);
    setApplying(false);

    if (!res.success) {
      setError(res.message || "Something went wrong. Please try again.");
      return;
    }
    setAlreadyApplied(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard access denied — fail silently, button just won't confirm
    }
  };

  if (loading) {
    return <div className="max-w-5xl mx-auto px-6 py-16 text-text-muted">Loading...</div>;
  }

  if (!opportunity) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-text-muted">Opportunity not found.</p>
        <Link to="/opportunities" className="text-accent hover:underline text-sm mt-2 inline-block">
          Back to opportunities
        </Link>
      </div>
    );
  }

  const organizer = mockUsers.find((u) => u.id === opportunity.organizerId);
  const isLowSpots = opportunity.spotsAvailable <= 2;
  const confirmedCount = (opportunity.totalSpots || 0) - opportunity.spotsAvailable;
  const fillPercent = opportunity.totalSpots
    ? Math.min(100, Math.round((confirmedCount / opportunity.totalSpots) * 100))
    : 0;

  const otherOpportunities = mockOpportunities
    .filter((o) => o.id !== opportunity.id)
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted mb-4 flex-wrap">
        <Link to="/opportunities" className="hover:text-text transition-colors">Opportunities</Link>
        <span>/</span>
        <span>{opportunity.category}</span>
        <span>/</span>
        <span className="text-text">{opportunity.title}</span>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors mb-4"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="bg-surface-alt text-accent text-xs font-medium px-2.5 py-1 rounded-full">
          {opportunity.category}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted bg-surface border border-border px-2.5 py-1 rounded-full">
          <span className={`w-1.5 h-1.5 rounded-full ${organizer?.cacVerified ? "bg-success" : "bg-warning"}`} />
          {organizer?.fullName}
          {organizer?.cacNumber && ` • CAC: ${organizer.cacNumber}`}
        </span>
      </div>

      <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-text mb-2">
        {opportunity.title}
      </h1>
      <p className="text-text-muted mb-6 max-w-2xl">{opportunity.description}</p>

      {/* Info strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 pb-6 border-b border-border">
        <InfoItem
          icon={Calendar}
          label="Date"
          value={formatDate(opportunity.date, { weekday: "long", year: "numeric" })}
        />
        <InfoItem icon={MapPin} label="Location" value={opportunity.location} />
        <InfoItem
          icon={Users}
          label="Crew Capacity"
          value={opportunity.totalSpots ? `${confirmedCount} / ${opportunity.totalSpots}` : `${opportunity.spotsAvailable} open`}
        />
      </div>

      {/* Hero image */}
      <div className="rounded-xl overflow-hidden mb-8 border border-border">
        <img
          src={getOpportunityImage(opportunity.category)}
          alt={opportunity.title}
          className="w-full h-64 sm:h-80 object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-surface rounded-xl border border-border p-6">
            <h2 className="font-heading text-lg font-semibold text-text mb-3">About This Initiative</h2>
            <p className="text-text-muted leading-relaxed">{opportunity.description}</p>
            <p className="text-text-muted leading-relaxed mt-3">
              As a volunteer, you'll work alongside {organizer?.fullName} and other community
              members on this initiative. {opportunity.tagline}.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-surface rounded-xl border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-text uppercase tracking-wide">Shift Registration</h3>
              <span className="text-xs font-medium text-success flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                Registration Open
              </span>
            </div>

            {opportunity.totalSpots && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-text-muted">Crew Availability</span>
                  <span className={isLowSpots ? "text-warning font-medium" : "text-success font-medium"}>
                    {opportunity.spotsAvailable} of {opportunity.totalSpots} spots remaining
                  </span>
                </div>
                <div className="w-full h-2 bg-surface-alt rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all"
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-text-muted mt-1">
                  <span>{confirmedCount} Confirmed</span>
                  <span>{opportunity.totalSpots} Max Capacity</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-text-muted mb-1.5">
              <Clock size={16} />
              {opportunity.schedule}
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
              <MapPin size={16} />
              {opportunity.location}
            </div>

            {!user ? (
              <div className="space-y-3">
                <p className="text-sm text-text-muted">Log in to apply to this opportunity.</p>
                <Link
                  to="/login"
                  className="w-full inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
                >
                  Log In
                </Link>
              </div>
            ) : user.role !== "volunteer" ? (
              <p className="text-sm text-text-muted">Only volunteer accounts can apply to opportunities.</p>
            ) : alreadyApplied ? (
              <div className="flex items-center gap-2 text-success text-sm font-medium">
                <CheckCircle2 size={18} />
                You've already applied.
              </div>
            ) : (
              <div>
                {error && <p className="text-sm text-danger mb-2">{error}</p>}
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className="w-full px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium shadow-sm transition-all disabled:opacity-70"
                >
                  {applying ? "Submitting..." : "Apply for this Shift"}
                </button>
              </div>
            )}

            <button
              onClick={handleCopyLink}
              className="w-full mt-3 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-surface-alt hover:bg-border text-text text-sm font-medium transition-colors"
            >
              <Share2 size={16} />
              {copied ? "Link Copied!" : "Share Link"}
            </button>
          </div>

          <div className="bg-surface rounded-xl border border-border p-5">
            <p className="text-xs text-text-muted uppercase tracking-wide mb-2">Organizer</p>
            <p className="text-sm font-medium text-text">{organizer?.fullName}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Mail size={14} className="text-text-muted" />
              <span className="text-sm text-text-muted">{organizer?.email}</span>
            </div>
          </div>

          <div className="bg-surface-alt rounded-xl p-4 flex items-start gap-2.5">
            <ShieldCheck size={18} className="text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-text leading-relaxed">
              {organizer?.cacVerified
                ? "This organizer's CAC registration number has been verified."
                : "This organizer's CAC registration is still pending verification."}
            </p>
          </div>
        </div>
      </div>

      {/* Other opportunities */}
      {otherOpportunities.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-xl font-semibold text-text">Other Opportunities</h2>
            <Link to="/opportunities" className="text-accent hover:text-accent-hover text-sm font-medium transition-colors">
              Browse all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherOpportunities.map((o) => (
              <OpportunityCard key={o.id} opportunity={o} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={18} className="text-accent shrink-0 mt-0.5" />
      <div>
        <p className="text-xs text-text-muted">{label}</p>
        <p className="text-sm font-medium text-text">{value}</p>
      </div>
    </div>
  );
}