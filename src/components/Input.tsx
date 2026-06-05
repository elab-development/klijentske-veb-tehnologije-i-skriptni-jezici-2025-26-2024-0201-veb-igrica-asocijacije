type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
};
export default function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: Props) {
  return (
    <label className="input-wrap">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
