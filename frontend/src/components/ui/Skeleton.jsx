export default function Skeleton({
  count = 1,
  className = "",
  rounded = "xl",
  height = "h-4",
  width = "w-full",
}) {
  const roundedMap = {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
    xl: "rounded-2xl",
    full: "rounded-full",
  };

  const blocks = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      aria-hidden="true"
      className={`relative isolate overflow-hidden ${roundedMap[rounded] || roundedMap.md} bg-[#EDE2DA] ${height} ${width} ${className}`}
      style={{
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
      }}
    >
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite]"
        style={{
          background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0) 100%)",
        }}
      />
    </div>
  ));

  return <>{blocks}</>;
}
