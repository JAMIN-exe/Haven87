export default function Badge({ status }) {
  const styles = {
    pending: "bg-warning/10 text-warning",
    approved: "bg-success/10 text-success",
    rejected: "bg-danger/10 text-danger",
  };
  const labels = { pending: "Pending", approved: "Approved", rejected: "Rejected" };

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[status] || "bg-border text-text-muted"}`}>
      {labels[status] || status}
    </span>
  );
}