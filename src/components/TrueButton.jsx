export default function TrueButton({ title, handleClick, isTrue, isWrong }) {
  return (
    <button
      onClick={(e) => {
        e.target.blur();
        handleClick();
      }}
      className={`
        w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white
        transition-shadow duration-300
        ${isTrue ? "bg-green-500 shadow-lg" : ""}
        ${isWrong ? "bg-red-500 shadow-lg" : ""}
        ${!isTrue && !isWrong ? "bg-white/10 hover:bg-white/20" : ""}
      `}
    >
      {title}
    </button>
  );
}
