export default function EmptyState({ message, children, className = "", messageClassName = "text-sm" }) {
	return (
		<div className={`bg-surface rounded-xl border border-border p-10 text-center ${className}`}>
			{message && <p className={`${messageClassName} text-text-muted`}>{message}</p>}
			{children}
		</div>
	);
}
