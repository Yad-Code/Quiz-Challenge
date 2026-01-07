export default function Button({ handleClick, title, className, id }) {
  return (
    <button
      id={id}
      onClick={(e) => {
        handleClick();
        e.target.blur();
      }}
      className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300
        ${className ? "bg-[#818cf8] text-white shadow-lg hover:bg-[#5263fb]" 
                   : "bg-white/10 text-white hover:bg-white/20"}`
      }
    >
      {title}
    </button>
  );
}
