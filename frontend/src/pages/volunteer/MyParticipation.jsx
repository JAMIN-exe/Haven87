import EmptyState from "../../components/ui/EmptyState";
import { formatDate } from "../../utils/formatDate";

export default function MyParticipation({ approvedApps, opportunitiesById }) {
	return (
		<section className="flex flex-col gap-4">
			<div>
				<h2 className="font-heading text-xl font-semibold text-text">Participation History</h2>
				<p className="text-sm text-text-muted">Opportunities you've been approved for.</p>
			</div>

			{approvedApps.length === 0 ? (
				<EmptyState message="No volunteering history yet — approved applications will show up here." />
			) : (
				<div className="bg-surface rounded-xl border border-border divide-y divide-border">
					{approvedApps.map((application) => {
						const opportunity = opportunitiesById[application.opportunityId];
						const organizerName = opportunity?.organizer?.fullName || "Organization";

						return (
							<div key={application.id} className="p-4 flex items-start justify-between gap-4">
								<div className="min-w-0">
									<p className="font-medium text-text wrap-break-word">{opportunity?.title}</p>
									<p className="text-sm text-text-muted wrap-break-word">
										{organizerName} · {opportunity?.location} · {formatDate(opportunity?.date)}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</section>
	);
}
