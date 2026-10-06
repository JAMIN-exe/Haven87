export default function Button({ children, variant = "primary", ...props }) {
  const base = "px-5 py-2.5 rounded-md font-medium text-sm transition-colors";
  const variants = {
    primary: "text-white",
    secondary: "border",
  };

  const style =
    variant === "primary"
      ? { backgroundColor: "var(--accent)" }
      : { borderColor: "var(--border)", color: "var(--text)" };

  return (
    <button
      className={`${base} ${variants[variant]}`}
      style={style}
      onMouseOver={(e) => {
        if (variant === "primary") e.target.style.backgroundColor = "var(--accent-hover)";
      }}
      onMouseOut={(e) => {
        if (variant === "primary") e.target.style.backgroundColor = "var(--accent)";
      }}
      {...props}
    >
      {children}
    </button>
  );
}