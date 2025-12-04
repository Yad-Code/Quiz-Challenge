export default function TrueButton({ title, handleClick, isTrue, isWrong }) {
  return (
    <div>
      <button
        className={isTrue ? "true" : isWrong ? "false" : ""}
        onClick={(e) => {
          e.target.blur();
          handleClick();
        }}
      >
        {title}
      </button>
    </div>
  );
}
