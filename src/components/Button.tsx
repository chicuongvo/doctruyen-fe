export default function Button({
  text,
  width,
  height,
  decoration,
}: {
  text: string;
  width: string;
  height: string;
  decoration?: string;
}) {
  return (
    <button
      className={`${width} ${height} font-spartan text-[18px] font-semibold text-white bg-gradient-to-bl from-primary to-secondary rounded-lg cursor-pointer ${decoration}`}
    >
      {text}
    </button>
  );
}
