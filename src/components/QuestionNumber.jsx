import { useState } from "react";
import Button from "./Button";

export default function QuestionNumber({ qNumber }) {
  const [isActive, setIsActive] = useState(5);

  function activeButton(num) {
    setIsActive(num);
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {[5, 10, 15, 20].map((num) => (
        <Button
          key={num}
          title={num}
          className={isActive === num}
          handleClick={() => activeButton(num)}
        />
      ))}
    </div>
  );
}
