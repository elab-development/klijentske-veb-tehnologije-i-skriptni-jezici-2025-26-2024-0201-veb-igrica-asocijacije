export default function StatCard({
  label,
  value,
  caption,
}: {
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="stat-card">
      <small>{label}</small>
      <strong>{value}</strong>
      <span>{caption}</span>
    </div>
  );
}
