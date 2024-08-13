export default function Square({
  value,
  onClick,
}: {
  value: string | null;
  onClick: () => void;
}) {
  return (
    <div className="m-2">
      <button
        className="w-24 h-24 bg-gray-200 border-2 border-black flex items-center justify-center text-4xl font-bold cursor-pointer hover:bg-gray-300 transition-colors"
        onClick={onClick}
      >
        {value}
      </button>
    </div>
  );
}
