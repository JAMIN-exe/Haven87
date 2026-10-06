import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Send, CheckCircle, MapPin, Calendar, ArrowRight } from "lucide-react";
import { getOpportunities } from "../api/api";
import Reveal from "../components/ui/Reveal";
import { formatDate } from "../utils/formatDate";
import { getOpportunityImage } from "../utils/opportunityImage";


const DISPLAY_STATS = {
  activeVolunteers: "1,420+",
  verifiedOrganizations: "85",
  openOpportunities: "40+",
};

export default function Landing() {
  const [featured, setFeatured] = useState([]);
  const stats = DISPLAY_STATS;

  useEffect(() => {
    if (window.location.hash) {
      const section = document.getElementById(window.location.hash.slice(1));
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    async function load() {
      const oppRes = await getOpportunities({ limit: 3 });
      if (oppRes.success) setFeatured(oppRes.data.items);
    }
    load();
  }, []);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="w-full bg-linear-to-b from-surface-alt via-bg to-bg">
        <div className="max-w-225 mx-auto px-6 pt-16 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-xs font-medium text-text mb-6">
            <span className="w-2 h-2 rounded-full bg-success" />
            {stats.activeVolunteers} volunteers active this week
          </div>

          <h1 className="font-heading text-[40px] md:text-[56px] leading-[1.1] font-semibold text-text tracking-tight">
            Make a <span className="italic text-accent">difference</span>
            <br />
            in your community
          </h1>

          <p className="text-base md:text-lg text-text-muted mt-5 max-w-xl mx-auto leading-relaxed">
            Haven 87 connects passionate volunteers with verified organizations.
            Find meaningful opportunities and be part of something bigger.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link
              to="/signup"
              className="inline-flex items-center gap-1.5 justify-center bg-accent hover:bg-accent-hover text-white text-sm font-medium px-6 py-3 rounded-lg shadow-sm transition-colors"
            >
              Join as a Volunteer
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center bg-surface border border-border text-text text-sm font-medium px-6 py-3 rounded-lg hover:bg-bg transition-colors"
            >
              Register an Organization
            </Link>
          </div>

          <div className="mt-12 bg-surface rounded-2xl shadow-sm border border-border inline-flex divide-x divide-border">
            <StatCell value={stats.activeVolunteers} label="Active volunteers" />
            <StatCell value={stats.verifiedOrganizations} label="Verified organizations" />
            <StatCell value={stats.openOpportunities} label="Open opportunities" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <Reveal>
        <section id="how-it-works" className="max-w-300 mx-auto px-6 py-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="text-xs text-accent font-medium uppercase tracking-wider mb-2">How It Works</p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-text">
              Three steps to start giving back
            </h2>
            <p className="text-text-muted mt-2">
              Sign up, browse, and apply — all in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { number: "1", title: "Create your profile", description: "Sign up in under 2 minutes. Tell us what causes you care about.", icon: Search },
              { number: "2", title: "Browse opportunities", description: "Search verified opportunities near you, filtered by cause or schedule.", icon: Send },
              { number: "3", title: "Show up & impact", description: "Apply, get confirmed, and build a real volunteering history.", icon: CheckCircle },
            ].map((step) => (
              <div key={step.number} className="bg-surface-alt rounded-xl p-6">
                <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center font-heading font-semibold text-sm mb-4">
                  {step.number}
                </div>
                <h3 className="font-heading text-lg font-semibold text-text">{step.title}</h3>
                <p className="text-sm text-text-muted mt-2 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Featured opportunities */}
      <Reveal>
        <section id="opportunities" className="w-full bg-surface-alt py-16">
          <div className="max-w-300 mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-10">
              <p className="text-xs text-accent font-medium uppercase tracking-wider mb-2">Featured Opportunities</p>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-text">Ways to help this week</h2>
              <p className="text-text-muted mt-2">Hand-picked opportunities from verified organizations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((opportunity) => (
                <FeaturedCard key={opportunity.id} opportunity={opportunity} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/opportunities"
                className="inline-flex items-center gap-1.5 text-accent hover:text-accent-hover text-sm font-medium transition-colors"
              >
                Browse all opportunities
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA banner */}
      <Reveal>
        <section className="w-full bg-accent">
          <div className="max-w-175 mx-auto px-6 py-16 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-white">
              Ready to make an impact?
            </h2>
            <p className="text-white/85 mt-3 max-w-md mx-auto">
              Join {stats.activeVolunteers} volunteers already making a difference. Your first
              opportunity is waiting.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-1.5 justify-center bg-white text-accent hover:bg-white/90 text-sm font-medium px-6 py-3 rounded-lg mt-6 shadow-sm transition-colors"
            >
              Get started — it's free
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

function StatCell({ value, label }) {
  return (
    <div className="px-6 md:px-8 py-4">
      <p className="font-heading text-2xl font-semibold text-accent">{value}</p>
      <p className="text-xs text-text-muted mt-1">{label}</p>
    </div>
  );
}

function FeaturedCard({ opportunity }) {
  const organizer = opportunity.organizer;

  return (
    <Link
      to={`/opportunities/${opportunity.id}`}
      className="bg-surface rounded-xl overflow-hidden shadow-sm border border-border hover:-translate-y-0.5 transition-transform duration-200 flex flex-col"
    >
      <div
        className="h-28 relative flex items-end p-4"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(24,18,14,0.75), rgba(24,18,14,0.1)), url('${getOpportunityImage(opportunity.category)}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <span className="relative bg-white/90 text-text text-xs font-medium px-2.5 py-1 rounded-full uppercase tracking-wide">
          {opportunity.category}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-heading text-lg font-semibold text-text">{opportunity.title}</h3>

        <div className="space-y-1.5 text-text-muted text-sm">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{formatDate(opportunity.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{opportunity.location}</span>
          </div>
        </div>

        {organizer && (
          <p className="text-xs text-text-muted">
            {opportunity.spotsAvailable == null
              ? `${opportunity.totalSpots} total spots`
              : `${opportunity.spotsAvailable} ${opportunity.spotsAvailable === 1 ? "spot" : "spots"} remaining`}
            {` · ${organizer.fullName}`}
          </p>
        )}

        <span className="mt-auto inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          Apply Now
        </span>
      </div>
    </Link>
  );
}