import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Clock, GraduationCap, MapPin, Search, Trees, Utensils } from "lucide-react";
import EmptyState from "../../components/ui/EmptyState";
import Input from "../../components/ui/Input";

const FILTERS = [
	{ key: "all", label: "All" },
	{ key: "pending", label: "Pending" },
	{ key: "approved", label: "Approved" },
	{ key: "rejected", label: "Not Selected" },
];

const STATUS_STYLES = {
	approved: { dot: "bg-success", text: "text-success", label: "Approved" },
	pending: { dot: "bg-warning", text: "text-warning", label: "Pending Review" },
	rejected: { dot: "bg-danger", text: "text-danger", label: "Not Selected" },
};

function categoryIcon(category) {
	if (category === "Food Relief") return Utensils;
	if (category === "Youth & Literacy") return GraduationCap;
	if (category === "Environmental Action") return Trees;
	return Briefcase;
}

export default function MyApplications({ applications, opportunitiesById, loading }) {
	const [filter, setFilter] = useState("all");
	const [search, setSearch] = useState("");

	const filteredApplications = applications.filter((application) => {
		const opportunity = opportunitiesById[application.opportunityId];
		const organizerName = opportunity?.organizer?.fullName || "Organization";
		const matchesFilter = filter === "all" || application.status === filter;
		const searchText = `${opportunity?.title || ""} ${organizerName} ${opportunity?.category || ""}`.toLowerCase();
		return matchesFilter && (!search || searchText.includes(search.toLowerCase()));
	});

	return (
		<section className="flex flex-col gap-4">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
				<div>
					<h2 className="font-heading text-xl font-semibold text-text">My Applications</h2>
					<p className="text-sm text-text-muted">Review the status of every role you've applied to.</p>
				</div>
				<div className="relative w-full sm:w-64">
					<Search size={16} className="absolute left-3 top-2.5 text-text-muted" />
					<Input
						id="application-search"
						type="search"
						aria-label="Search applications"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Search role or organization..."
						inputClassName="pl-9 pr-3 py-2 bg-surface border border-border text-sm placeholder-text-muted/70 focus:ring-accent"
					/>
				</div>
			</div>

			<div className="flex items-center gap-2 overflow-x-auto pb-1">
				{FILTERS.map((item) => {
					const count = item.key === "all"
						? applications.length
						: applications.filter((application) => application.status === item.key).length;

					return (
						<button
							key={item.key}
							onClick={() => setFilter(item.key)}
							className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 ${
								filter === item.key ? "bg-text text-surface" : "bg-surface text-text-muted hover:text-text"
							}`}
						>
							{item.label} ({count})
						</button>
					);
				})}
			</div>

			{loading ? (
				<p className="text-text-muted text-sm">Loading...</p>
			) : filteredApplications.length === 0 ? (
				<EmptyState message="No applications match this filter." />
			) : (
				<div className="flex flex-col gap-3">
					{filteredApplications.map((application) => {
						const opportunity = opportunitiesById[application.opportunityId];
						const organizerName = opportunity?.organizer?.fullName || "Organization";
						const Icon = categoryIcon(opportunity?.category);
						const status = STATUS_STYLES[application.status] || STATUS_STYLES.pending;

						return (
							<div
								key={application.id}
								className="bg-surface rounded-xl p-4 sm:p-5 border border-border shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4"
							>
								<div className="flex items-start gap-4 min-w-0">
									<div className="w-11 h-11 rounded-xl bg-surface-alt flex items-center justify-center shrink-0 text-accent">
										<Icon size={20} />
									</div>
									<div className="min-w-0">
										<div className="flex flex-wrap items-center gap-2 mb-1">
											<span className="font-semibold text-text wrap-break-word">{opportunity?.title}</span>
											<span className="text-xs px-2 py-0.5 rounded-full bg-surface-alt text-text-muted font-medium">
												{opportunity?.category}
											</span>
										</div>
										<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-muted">
											<span className="font-medium text-text">{organizerName}</span>
											<span className="flex items-center gap-1">
												<MapPin size={14} />
												{opportunity?.location}
											</span>
											<span className="flex items-center gap-1">
												<Clock size={14} />
												{opportunity?.schedule}
											</span>
										</div>
									</div>
								</div>

								<div className="flex items-center justify-between lg:justify-end gap-4 shrink-0">
									<span className={`flex items-center gap-1.5 text-xs font-medium whitespace-nowrap ${status.text}`}>
										<span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
										{status.label}
									</span>
									<Link
										to={`/opportunities/${opportunity?.id}`}
										className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-alt hover:bg-border text-text text-sm font-medium transition-colors"
									>
										View Opportunity
										<ArrowRight size={14} />
									</Link>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</section>
	);
}
