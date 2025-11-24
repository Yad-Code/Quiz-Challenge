export default function Button({ handleClick, title }) {
  return (
    <div className="myButton">
      <button
        onClick={(e) => {
          handleClick();
          e.target.blur();
        }}
      >
        {title}
      </button>
    </div>
  );
}
