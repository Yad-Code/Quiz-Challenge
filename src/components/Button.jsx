export default function Button({ handleClick, title, className, id }) {
  return (
    <div className="myButton">
      <button
        id={id}
        className={className === true ? "active" : "inactive"}
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
