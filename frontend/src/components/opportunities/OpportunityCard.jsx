import { Link } from "react-router-dom";
import { MapPin, Users } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function OpportunityCard({ opportunity }) {
  const organizer = opportunity.organizer;

  return (
    <article className="bg-surface rounded-xl p-6 flex flex-col justify-between shadow-sm border border-border hover:-translate-y-0.5 transition-transform duration-200">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="bg-bg text-accent text-xs font-medium px-2.5 py-1 rounded-full">
            {opportunity.category}
          </span>
          <span className="text-xs font-medium flex items-center gap-1.5 text-text-muted">
            <Users size={14} />
            {opportunity.spotsAvailable == null
              ? `${opportunity.totalSpots} total spots`
              : `${opportunity.spotsAvailable} ${opportunity.spotsAvailable === 1 ? "spot" : "spots"} remaining`}
          </span>
        </div>

        <Link to={`/opportunities/${opportunity.id}`}>
          <h3 className="font-heading text-lg font-semibold text-text hover:text-accent transition-colors">
            {opportunity.title}
          </h3>
        </Link>

        {organizer && (
          <div className="flex items-center gap-1.5 mt-2">
            <span className={`w-2 h-2 rounded-full ${organizer.cacVerified ? "bg-success" : "bg-warning"}`} />
            <span className="text-xs font-medium text-text">{organizer.fullName}</span>
            <span className="text-text-muted text-[11px]">
              • {organizer.cacVerified ? "Verified Organizer" : "Pending Verification"}
            </span>
          </div>
        )}

        <div className="mt-4 space-y-1.5 text-text-muted text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{formatDate(opportunity.date)}</span>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-4 flex items-center justify-end">
        <Link
          to={`/opportunities/${opportunity.id}`}
          className="bg-accent hover:bg-accent-hover text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
        >
          Apply
        </Link>
      </div>
    </article>
  );
}