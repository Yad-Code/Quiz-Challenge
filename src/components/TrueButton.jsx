
export default function TrueButton({ title, handleClick, isTrue, isWrong }) {
  return (
    <div>
      <button
        className={
          //className === true ? "true" : className === "false" ? "false" : ""
          isTrue ? "true" : isWrong ? "false" : ""
        }
        onClick={handleClick}
      >
        {title}
      </button>
    </div>
  );
}
