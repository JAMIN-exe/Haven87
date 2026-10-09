export default function Input({
	id,
	name,
	label,
	wrapperClassName = "",
	labelClassName = "block text-sm font-medium text-text mb-1",
	inputClassName = "",
	...inputProps
}) {
	const inputId = id || name;

	return (
		<div className={wrapperClassName}>
			{label && (
				<label htmlFor={inputId} className={labelClassName}>
					{label}
				</label>
			)}
			<input
				id={inputId}
				name={name}
				className={`w-full px-4 py-2.5 bg-surface-alt text-text placeholder-text-muted/70 rounded-lg outline-none focus:bg-surface focus:ring-2 focus:ring-accent transition-all ${inputClassName}`}
				{...inputProps}
			/>
		</div>
	);
}
