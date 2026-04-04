type SpinnerProps = {
  label?: string;
};

export default function Spinner({ label = "Loading..." }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center p-10 gap-4">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-[#8aab5c] animate-pulse"
            style={{ animationDelay: `${i * 0.2}s`, animationDuration: "1.4s" }}
          />
        ))}
      </div>
      {label && (
        <p className="text-[13px] text-[#555]">{label}</p>
      )}
    </div>
  );
}