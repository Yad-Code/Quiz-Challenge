import { useState } from "react";
import Button from "./Button";

export default function QuestionNumber({qNumber}) {
  const [isActive, setIsActive] = useState(5);

  function activeButton(num) {
    setIsActive(num);
  }
  return (
    <div className="myButtons">
      <Button
        className={isActive === 5}
        handleClick={() => activeButton(5)}
        title={5}
      />
      <Button
        className={isActive === 10}
        handleClick={() => activeButton(10)}
        title={10}
      />
      <Button
        className={isActive === 15}
        handleClick={() => activeButton(15)}
        title={15}
      />
      <Button
        className={isActive === 20}
        handleClick={() => activeButton(20)}
        title={20}
      />
    </div>
  );
}
